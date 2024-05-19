"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const data_source_1 = require("../utils/data-source");
const user_entity_1 = require("../models/user.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IdentityService {
    constructor() {
        this.accountRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    loginAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const entity = yield this.accountRepository.findOne({
                    where: { email: input.email, isDeleted: false },
                });
                if (!entity)
                    return {
                        success: false,
                    };
                const isValidPassword = yield bcryptjs_1.default.compare(input.password, entity.password);
                if (!isValidPassword)
                    return {
                        success: false,
                    };
                const payload = {
                    id: entity.userId,
                    email: entity.email,
                    fullName: entity.fullName,
                    roleId: entity.roleId,
                };
                const tokenSecretKey = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
                const accessToken = jsonwebtoken_1.default.sign(payload, tokenSecretKey, {
                    expiresIn: "72h",
                });
                return {
                    success: true,
                    message: {
                        accessToken: accessToken,
                        user: {
                            id: entity.userId,
                            email: entity.email,
                            fullName: entity.fullName,
                            roleId: entity.roleId,
                        },
                    },
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = this.accountRepository.create(input);
            account.createdDate = new Date(Date());
            account.isDeleted = false;
            yield this.accountRepository.save(account);
        });
    }
    updateAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.accountRepository.findOne({
                where: { userId: input.userId },
            });
            if (entity != null) {
                entity.fullName = input.fullName;
                entity.email = input.email;
                entity.roleId = input.roleId;
                if (input.password)
                    entity.password = input.password;
            }
            entity.updatedDate = new Date(Date());
            yield this.accountRepository.save(entity);
        });
    }
    deleteAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountRepository.findOne({
                where: { userId: input.userId },
            });
            if (account != null) {
                account.isDeleted = true;
                account.updatedDate = new Date(Date());
            }
            yield this.accountRepository.save(account);
        });
    }
    getCurrentLoginInformation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountRepository.findOne({
                where: { userId: id },
            });
            return {
                id: account.userId,
                fullName: account.fullName,
                email: account.email,
                roleId: account.roleId,
            };
        });
    }
}
exports.default = new IdentityService();

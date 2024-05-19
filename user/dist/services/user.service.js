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
const autoMapper_1 = __importDefault(require("../utils/autoMapper"));
const data_source_1 = require("../utils/data-source");
const user_1 = require("../dtos/user");
const user_entity_1 = require("../models/user.entity");
const typeorm_1 = require("typeorm");
const axios_1 = __importDefault(require("axios"));
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.userRepository.findOne({
                    where: { email: input.email },
                });
                if (entity)
                    return null;
                const salt = yield bcryptjs_1.default.genSalt(10);
                input.password = yield bcryptjs_1.default.hash(input.password, salt);
                const user = this.userRepository.create(autoMapper_1.default.map(input, user_1.CreateUserInputDto, user_entity_1.User));
                yield this.userRepository.save(user);
                yield axios_1.default.post("http://localhost:8081/api/v1/identity/createAccount", {
                    userId: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    password: user.password,
                    roleId: user.roleId,
                });
                return user;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateUser(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { id } });
                if (!user)
                    return null;
                console.log(id, input, user);
                user.roleId = input.roleId;
                user.email = input.email;
                user.fullName = input.fullName;
                user.updatedDate = new Date(Date());
                if (input.password) {
                    const isVerified = yield bcryptjs_1.default.compare(input.password, user.password);
                    if (isVerified) {
                        const salt = yield bcryptjs_1.default.genSalt(10);
                        input.password = yield bcryptjs_1.default.hash(input.password, salt);
                        user.password = input.password;
                    }
                }
                yield this.userRepository.save(user);
                yield axios_1.default.post("http://localhost:8081/api/v1/identity/updateAccount", {
                    userId: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    password: user.password,
                    roleId: user.roleId,
                });
                return yield this.get(id);
            }
            catch (err) {
                console.log("err: ", err);
                throw new Error(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = Date();
                const entity = yield this.userRepository.findOne({
                    where: { id },
                });
                if (!entity)
                    return null;
                entity.isDeleted = true;
                entity.updatedDate = new Date(date);
                yield axios_1.default.post("http://localhost:8081/api/v1/identity/deleteAccount", {
                    userId: entity.id,
                });
                yield this.userRepository.save(entity);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id, isDeleted: false },
                    relations: ["role"],
                });
                if (!user)
                    return null;
                return autoMapper_1.default.map(user, user_entity_1.User, user_1.UserDto);
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAll(pageNumber, pageSize, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchCondition = keyword
                    ? { fullName: (0, typeorm_1.Like)(`%${keyword}%`) }
                    : {};
                searchCondition.isDeleted = false;
                const users = yield this.userRepository.find({
                    where: searchCondition,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    relations: ["role"],
                });
                const total = yield this.userRepository.count({ where: searchCondition });
                return {
                    items: autoMapper_1.default.mapArray(users, user_entity_1.User, user_1.UserDto),
                    total: total,
                    currentPage: pageNumber,
                    pageSize: pageSize,
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new UserService();

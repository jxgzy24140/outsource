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
const data_source_1 = require("../utils/data-source");
const role_entity_1 = require("../models/role.entity");
const role_1 = require("../dtos/role");
const autoMapper_1 = __importDefault(require("../utils/autoMapper"));
class RoleService {
    constructor() {
        this.roleRepository = data_source_1.AppDataSource.getRepository(role_entity_1.Role);
    }
    createRole(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRole = this.roleRepository.create(input);
                newRole.createdDate = new Date();
                newRole.isDeleted = false;
                yield this.roleRepository.save(newRole);
                return newRole;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateRole(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var entity = yield this.roleRepository.findOne({
                    where: { id },
                });
                if (entity == null)
                    return null;
                entity.roleName = input.roleName;
                entity.updatedDate = new Date();
                yield this.roleRepository.update(id, entity);
                return autoMapper_1.default.map(entity, role_entity_1.Role, role_1.RoleDto);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.roleRepository.findOne({
                    where: { id },
                });
                if (!entity)
                    return null;
                entity.isDeleted = true;
                entity.updatedDate = new Date();
                yield this.roleRepository.update(id, entity);
            }
            catch (_a) {
                return null;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return ((_a = (yield this.roleRepository.findOne({
                    where: { id },
                }))) !== null && _a !== void 0 ? _a : null);
            }
            catch (_b) {
                return null;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.roleRepository.find({});
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new RoleService();

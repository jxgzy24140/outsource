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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../utils/data-source");
const category_entity_1 = require("../models/category.entity");
class CategoryService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
    }
    createAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = this.repository.create(input);
                entity.createdDate = new Date();
                entity.isDeleted = false;
                yield this.repository.save(entity);
                return entity;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateAsync(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({ where: { id } });
                if (!entity)
                    return null;
                entity.categoryName = input.categoryName;
                entity.updatedDate = new Date();
                yield this.repository.save(entity);
                return entity;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    deleteAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({
                    where: { id },
                });
                if (!entity)
                    return null;
                entity.isDeleted = true;
                entity.updatedDate = new Date();
                yield this.repository.update(id, entity);
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return ((_a = (yield this.repository.findOne({
                    where: { id },
                }))) !== null && _a !== void 0 ? _a : null);
            }
            catch (_b) {
                return null;
            }
        });
    }
    getAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.find();
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new CategoryService();

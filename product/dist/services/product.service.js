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
const autoMapper_1 = __importDefault(require("../utils/autoMapper"));
const data_source_1 = require("../utils/data-source");
const product_1 = require("../dtos/product");
const product_entity_1 = require("../models/product.entity");
const typeorm_1 = require("typeorm");
class ProductService {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
    }
    createAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = Date();
                const check = yield this.repository.findOne({
                    where: { productName: input.productName },
                });
                if (check)
                    return null;
                const entity = this.repository.create(autoMapper_1.default.map(input, product_1.CreateProductInputDto, product_entity_1.Product));
                entity.createdDate = new Date(date);
                entity.isDeleted = false;
                yield this.repository.save(entity);
                const createdEntity = yield this.repository.findOne({
                    where: { id: entity.id },
                    relations: ["category"],
                });
                return autoMapper_1.default.map(createdEntity, product_entity_1.Product, product_1.ProductDto);
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
                input.updatedDate = new Date();
                yield this.repository.save(autoMapper_1.default.map(input, product_1.UpdateProductInputDto, product_entity_1.Product));
                const updatedEntity = yield this.repository.findOne({
                    where: { id },
                    relations: ["category"],
                });
                return autoMapper_1.default.map(updatedEntity, product_entity_1.Product, product_1.ProductDto);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    deleteAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = Date();
                const entity = yield this.repository.findOne({
                    where: { id },
                });
                if (!entity)
                    return null;
                entity.isDeleted = true;
                entity.updatedDate = new Date(date);
                yield this.repository.update(id, entity);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({
                    where: { id },
                    relations: ["category"],
                });
                if (!entity)
                    return null;
                return autoMapper_1.default.map(entity, product_entity_1.Product, product_1.ProductDto);
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAllAsync(pageNumber, pageSize, typeId, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchCondition = keyword
                    ? { productName: (0, typeorm_1.Like)(`%${keyword}%`) }
                    : {};
                if (typeId && typeId !== undefined) {
                    searchCondition.typeId = typeId;
                }
                searchCondition.isDeleted = false;
                const entities = yield this.repository.find({
                    where: searchCondition,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    relations: ["category"],
                });
                const total = yield this.repository.count({ where: searchCondition });
                return {
                    items: autoMapper_1.default.mapArray(entities, product_entity_1.Product, product_1.ProductDto),
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
    createOrderAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < input.length; i++) {
                const entity = yield this.repository.findOne({
                    where: {
                        id: input[i].id,
                        price: input[i].price,
                        quantity: input[i].quantity,
                    },
                });
                if (!entity)
                    return null;
            }
            return true;
        });
    }
    updateProductAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < input.length; i++) {
                    const { id, quantity } = input[i];
                    const entity = yield this.repository.findOne({
                        where: {
                            id,
                        },
                    });
                    entity.quantity -= quantity;
                    yield this.repository.save(entity);
                }
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.default = new ProductService();

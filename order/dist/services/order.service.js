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
const dtos_1 = require("../dtos");
const order_entity_1 = require("../models/order.entity");
const axios_1 = __importDefault(require("axios"));
const orderDetail_entity_1 = require("../models/orderDetail.entity");
const typeorm_1 = require("typeorm");
class OrderService {
    constructor() {
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_entity_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_entity_1.OrderDetail);
    }
    createAsync(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResponse = yield axios_1.default.post("http://localhost:8082/api/v1/products/createOrder", { products: input.products });
            if (!productResponse.data.success)
                return null;
            const userResponse = yield axios_1.default.get(`http://localhost:8080/api/v1/users/${input.userId}`);
            if (!userResponse.data.success)
                return null;
            const entity = this.orderRepository.create(autoMapper_1.default.map(input, dtos_1.CreateOrderInputDto, order_entity_1.Order));
            yield this.orderRepository.save(entity);
            for (let i = 0; i < input.products.length; i++) {
                const product = input.products[i];
                const orderDetail = new orderDetail_entity_1.OrderDetail();
                orderDetail.orderId = entity.id;
                orderDetail.productId = product.id;
                orderDetail.productName = product.productName;
                orderDetail.quantity = product.quantity;
                orderDetail.price = product.price;
                orderDetail.image = product.image;
                const orderDetailEntity = this.orderDetailRepository.create(orderDetail);
                yield this.orderDetailRepository.save(orderDetailEntity);
            }
            const updateProductResponse = yield axios_1.default.post("http://localhost:8082/api/v1/products/updateProduct", { products: input.products });
            if (!updateProductResponse.data.success)
                return null;
            return yield this.getAsync(entity.id);
        });
    }
    updateAsync(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.orderRepository.findOne({
                    where: { id },
                });
                if (!entity)
                    return null;
                entity.orderStatusId = input.orderStatusId;
                entity.updatedDate = new Date(Date());
                yield this.orderRepository.save(entity);
                return yield this.getAsync(entity.id);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.orderRepository.findOne({
                    where: { id },
                    relations: ["orderDetails", "orderStatus"],
                });
                if (!entity)
                    return null;
                return autoMapper_1.default.map(entity, order_entity_1.Order, dtos_1.OrderDto);
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAllAsync(req, pageNumber, pageSize, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { roleId, id } = req["user"];
                const searchCondition = keyword
                    ? { receivedName: (0, typeorm_1.Like)(`%${keyword}%`) }
                    : {};
                if (roleId == 1) {
                    searchCondition.userId = id;
                }
                const entities = yield this.orderRepository.find({
                    where: searchCondition,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    relations: ["orderDetails", "orderStatus"],
                });
                const total = yield this.orderRepository.count({
                    where: searchCondition,
                });
                return {
                    items: autoMapper_1.default.mapArray(entities, order_entity_1.Order, dtos_1.OrderDto),
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
exports.default = new OrderService();

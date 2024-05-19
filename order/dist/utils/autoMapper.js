"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const classes_1 = require("@automapper/classes");
const order_entity_1 = require("../models/order.entity");
const dtos_1 = require("../dtos");
const userProfile = (mapper) => {
    (0, core_1.createMap)(mapper, order_entity_1.Order, dtos_1.OrderDto, (0, core_1.forMember)((dest) => dest.orderStatusName, (0, core_1.mapFrom)((x) => x.orderStatus.name)), (0, core_1.forMember)((dest) => dest.orderDetails, (0, core_1.mapFrom)((x) => x.orderDetails)));
    (0, core_1.createMap)(mapper, dtos_1.CreateOrderInputDto, order_entity_1.Order, (0, core_1.forMember)((dest) => dest.orderStatusId, (0, core_1.mapFrom)((x) => 1)), (0, core_1.forMember)((dest) => dest.createdDate, (0, core_1.mapFrom)((x) => {
        return new Date(Date());
    })), (0, core_1.forMember)((dest) => dest.isDeleted, (0, core_1.mapFrom)((x) => false)));
};
const mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
(0, core_1.addProfile)(mapper, userProfile);
exports.default = mapper;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../models/order.entity");
const orderStatus_entity_1 = require("../models/orderStatus.entity");
const orderDetail_entity_1 = require("../models/orderDetail.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3310,
    username: "root",
    password: "",
    database: "order_db",
    synchronize: true,
    entities: [order_entity_1.Order, orderStatus_entity_1.OrderStatus, orderDetail_entity_1.OrderDetail],
});

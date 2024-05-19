"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../models/product.entity");
const category_entity_1 = require("../models/category.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "",
    database: "product_db",
    synchronize: true,
    entities: [product_entity_1.Product, category_entity_1.Category],
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const classes_1 = require("@automapper/classes");
const product_entity_1 = require("../models/product.entity");
const product_1 = require("../dtos/product");
const userProfile = (mapper) => {
    (0, core_1.createMap)(mapper, product_entity_1.Product, product_1.ProductDto, (0, core_1.forMember)((dest) => dest.categoryName, (0, core_1.mapFrom)((x) => x.category.categoryName)));
    (0, core_1.createMap)(mapper, product_1.UpdateProductInputDto, product_entity_1.Product);
    (0, core_1.createMap)(mapper, product_1.CreateProductInputDto, product_entity_1.Product);
};
const mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
(0, core_1.addProfile)(mapper, userProfile);
exports.default = mapper;

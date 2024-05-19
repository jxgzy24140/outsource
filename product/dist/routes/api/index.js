"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const product_1 = __importDefault(require("./product"));
const category_1 = __importDefault(require("./category"));
const router = express.Router();
router.use("/products", product_1.default);
router.use("/categories", category_1.default);
exports.default = router;

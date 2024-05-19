"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const order_1 = __importDefault(require("./order"));
const router = express.Router();
router.use("/orders", order_1.default);
exports.default = router;

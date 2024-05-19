"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_1 = __importDefault(require("./api"));
const router = express.Router();
router.use("/api/v1", api_1.default);
exports.default = router;

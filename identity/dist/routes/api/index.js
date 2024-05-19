"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const identity_1 = __importDefault(require("./identity"));
const router = express.Router();
router.use("/identity", identity_1.default);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = __importDefault(require("./user"));
const role_1 = __importDefault(require("./role"));
const router = express.Router();
router.use("/users", user_1.default);
router.use("/roles", role_1.default);
exports.default = router;

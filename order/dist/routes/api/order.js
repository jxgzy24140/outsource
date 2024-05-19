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
const express = require("express");
const order_service_1 = __importDefault(require("../../services/order.service"));
const identityMiddleware_1 = require("../../middlewares/identityMiddleware");
const router = express.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const entity = yield order_service_1.default.getAsync(id);
        if (!entity)
            return res
                .status(404)
                .json({ success: false, message: "Entity not found" });
        return res.status(200).json({
            success: true,
            message: "success",
            data: entity,
        });
    }
    catch (_a) { }
}));
router.get("/", identityMiddleware_1.identityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize, pageNumber } = req.query;
    const result = yield order_service_1.default.getAllAsync(req, pageNumber, pageSize);
    return res.status(200).json({ success: true, data: result });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const result = yield order_service_1.default.createAsync(input);
    if (!result)
        return res.status(400).json({ success: false, message: "Created failed!" });
    return res
        .status(200)
        .json({ success: true, message: "Created successfully", data: result });
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const input = req.body;
    if (id != input.id)
        return res.status(400).json({ success: false, message: "Invalid input" });
    const result = yield order_service_1.default.updateAsync(id, input);
    if (!result)
        return res.status(404).json({ success: false, message: "Updated failed!" });
    return res
        .status(200)
        .json({ success: true, message: "Success", data: result });
}));
exports.default = router;

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
const category_service_1 = __importDefault(require("../../services/category.service"));
const router = express.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const entity = yield category_service_1.default.getAsync(id);
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
    catch (err) {
        console.log(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.getAllAsync();
    return res.status(200).json(result);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const result = yield category_service_1.default.createAsync(input);
    if (!result)
        return res.status(400).json({ success: false, message: "Created failed!" });
    return res
        .status(200)
        .json({ success: true, message: "Created successfully" });
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.default.deleteAsync(id);
    if (!result)
        return res.status(404).json({ success: false, message: "Deleted failed!" });
    return res.status(200).json({ success: false, message: "Success" });
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const input = req.body;
    if (id != input.id)
        return res
            .status(400)
            .json({ success: false, message: "Input is not valid!" });
    const result = yield category_service_1.default.updateAsync(id, input);
    if (!result)
        return res.status(404).json({ success: false, message: "Updated failed!" });
    return res.status(200).json({ success: true, message: "Success" });
}));
exports.default = router;

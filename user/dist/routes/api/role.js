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
const role_service_1 = __importDefault(require("../../services/role.service"));
const router = express.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { id } = req.params;
    try {
        const role = yield role_service_1.default.get(id);
        if (!role)
            return res
                .status(404)
                .json({ success: false, message: "Role not found" });
        return res.status(200).json({
            success: true,
            message: "success",
            data: role,
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield role_service_1.default.getAll();
    return res.status(200).json(result);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const result = yield role_service_1.default.createRole(input);
    if (!result)
        return res.status(400).json({ success: false, message: "Created failed!" });
    return res.status(200).json(result);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield role_service_1.default.delete(id);
            return res.status(200).json({ success: true, message: "Success" });
        }
        catch (_a) {
            return res
                .status(200)
                .json({ success: false, message: "Deleted failed" });
        }
    }));
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const input = req.body;
    const result = yield role_service_1.default.updateRole(id, input);
    if (!result)
        return res.status(404).json({ success: false, message: "Updated failed!" });
    return res.status(200).json({ success: false, message: "Success" });
}));
exports.default = router;

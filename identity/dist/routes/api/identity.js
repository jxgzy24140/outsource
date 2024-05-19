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
const identity_service_1 = __importDefault(require("../../services/identity.service"));
const identityMiddleware_1 = require("../../middlewares/identityMiddleware");
const router = express.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    try {
        const result = yield identity_service_1.default.loginAsync(input);
        return res.status(200).json({
            result,
        });
    }
    catch (_a) { }
}));
router.post("/createAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    yield identity_service_1.default.createAccount(input);
    return res.status(200).json({ success: true });
}));
router.post("/createAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    yield identity_service_1.default.createAccount(input);
    return res.status(200).json({ success: true });
}));
router.post("/updateAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    yield identity_service_1.default.updateAccount(input);
    return res.status(200).json({ success: true });
}));
router.post("/deleteAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    yield identity_service_1.default.deleteAccount(input);
    return res.status(200).json({ success: true });
}));
router.get("/currentLoginInformation", identityMiddleware_1.identityMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req["user"];
    const result = yield identity_service_1.default.getCurrentLoginInformation(id);
    return res
        .status(200)
        .json({ success: true, message: "Success", data: result });
}));
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityMiddleware = void 0;
const jwt = require("jsonwebtoken");
function identityMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || authHeader == null)
        return res
            .status(401)
            .json({ success: false, message: "Invalid authorization" });
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Token is not valid!" });
    else {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err)
                return res.status(403).json({ success: false, message: "Forbidden!" });
            req.user = user;
            next();
        });
    }
}
exports.identityMiddleware = identityMiddleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./utils/data-source");
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Connect database success");
});
app.use((0, cors_1.default)());
app.use(express_1.default.static("./public"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("", routes_1.default);
server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

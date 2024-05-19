"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const role_entity_1 = require("../models/role.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "user_db",
    synchronize: true,
    entities: [user_entity_1.User, role_entity_1.Role],
});

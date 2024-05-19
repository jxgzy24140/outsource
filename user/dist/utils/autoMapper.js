"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const classes_1 = require("@automapper/classes");
const user_entity_1 = require("../models/user.entity");
const user_1 = require("../dtos/user");
const userProfile = (mapper) => {
    (0, core_1.createMap)(mapper, user_entity_1.User, user_1.UserDto, (0, core_1.forMember)((dest) => dest.roleName, (0, core_1.mapFrom)((x) => x.role.roleName)), (0, core_1.forMember)((dest) => dest.password, (0, core_1.ignore)()));
    (0, core_1.createMap)(mapper, user_1.CreateUserInputDto, user_entity_1.User, (0, core_1.forMember)((dest) => dest.roleId, (0, core_1.mapFrom)((x) => 1)), (0, core_1.forMember)((dest) => dest.createdDate, (0, core_1.mapFrom)((x) => new Date(Date()))), (0, core_1.forMember)((dest) => dest.isDeleted, (0, core_1.mapFrom)((x) => false)));
};
const mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
(0, core_1.addProfile)(mapper, userProfile);
exports.default = mapper;

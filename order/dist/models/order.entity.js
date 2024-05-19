"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const orderStatus_entity_1 = require("./orderStatus.entity");
const orderDetail_entity_1 = require("./orderDetail.entity");
const classes_1 = require("@automapper/classes");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "receivedName", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "phoneNumber", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "orderStatusId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Order.prototype, "createdDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "updatedDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Order.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orderStatus_entity_1.OrderStatus),
    __metadata("design:type", orderStatus_entity_1.OrderStatus)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetail, (orderDetail) => orderDetail.order),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);

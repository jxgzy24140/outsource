import { OrderStatus } from "./orderStatus.entity";
import { OrderDetail } from "./orderDetail.entity";
export declare class Order {
    id: number;
    userId: number;
    receivedName: string;
    phoneNumber: string;
    address: string;
    orderStatusId: number;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    orderStatus?: OrderStatus;
    orderDetails: OrderDetail[];
}

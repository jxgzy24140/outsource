import { OrderDetail } from "../models/orderDetail.entity";
export declare class OrderDto {
    id: number;
    userId: number;
    receivedName: string;
    address: string;
    phoneNumber: string;
    orderStatusId: number;
    orderStatusName: string;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    orderDetails: OrderDetail[] | [];
}

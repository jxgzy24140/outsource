import { Order } from "./order.entity";
export declare class OrderDetail {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    image: string;
    order: Order;
}

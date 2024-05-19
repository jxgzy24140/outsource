export declare class CreateOrderInputDto {
    products: OrderProducts[];
    userId: number;
    receivedName: string;
    phoneNumber: string;
    address: string;
}
declare class OrderProducts {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    image: string;
}
export {};

import { Category } from "./category.entity";
export declare class Product {
    id: number;
    typeId: number;
    categoryId: number;
    productName: string;
    price: string;
    image: string;
    size: number;
    quantity: string;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    category: Category;
}

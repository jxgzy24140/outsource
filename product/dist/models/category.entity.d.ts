import { Product } from "./product.entity";
export declare class Category {
    id: number;
    categoryName: string;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    products?: Product[];
}

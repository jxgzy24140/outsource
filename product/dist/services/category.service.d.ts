import { Category } from "../models/category.entity";
declare class CategoryService {
    private repository;
    createAsync(input: Category): Promise<Category | null>;
    updateAsync(id: number, input: Category): Promise<Category | null>;
    deleteAsync(id: number): Promise<null | undefined>;
    getAsync(id: number): Promise<Category | null>;
    getAllAsync(): Promise<Category[] | []>;
}
declare const _default: CategoryService;
export default _default;

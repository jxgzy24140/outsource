import { CreateProductInputDto, UpdateProductInputDto, ProductDto } from "../dtos/product";
declare class ProductService {
    private readonly repository;
    constructor();
    createAsync(input: CreateProductInputDto): Promise<ProductDto | null>;
    updateAsync(id: number, input: UpdateProductInputDto): Promise<ProductDto | null>;
    deleteAsync(id: number): Promise<boolean | null>;
    getAsync(id: number): Promise<ProductDto | null>;
    getAllAsync(pageNumber: number, pageSize: number, typeId?: number, keyword?: string): Promise<{
        items: ProductDto[];
        total: number;
        currentPage: number;
        pageSize: number;
    }>;
    createOrderAsync(input: any): Promise<true | null>;
    updateProductAsync(input: any): Promise<boolean>;
}
declare const _default: ProductService;
export default _default;

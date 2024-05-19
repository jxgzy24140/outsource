import { CreateOrderInputDto, UpdateOrderInputDto, OrderDto } from "../dtos";
declare class OrderService {
    private readonly orderRepository;
    private readonly orderDetailRepository;
    constructor();
    createAsync(input: CreateOrderInputDto): Promise<OrderDto | null>;
    updateAsync(id: number, input: UpdateOrderInputDto): Promise<OrderDto | null>;
    getAsync(id: number): Promise<OrderDto | null>;
    getAllAsync(req: any, pageNumber: number, pageSize: number, keyword?: string): Promise<{
        items: OrderDto[];
        total: number;
        currentPage: number;
        pageSize: number;
    }>;
}
declare const _default: OrderService;
export default _default;

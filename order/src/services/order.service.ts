import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import { CreateOrderInputDto, UpdateOrderInputDto, OrderDto } from "../dtos";
import { Order } from "../models/order.entity";
import axios from "axios";
import { OrderDetail } from "../models/orderDetail.entity";
import { Like } from "typeorm";
class OrderService {
  private readonly orderRepository;
  private readonly orderDetailRepository;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
  }

  async createAsync(input: CreateOrderInputDto) {
    const date = Date();
    const productResponse: any = await axios.post(
      "http://localhost:8082/api/v1/products/createOrder",
      { products: input.products }
    );
    if (!productResponse.data.success) return null;

    const userResponse: any = await axios.get(
      `http://localhost:8080/api/v1/users/${input.userId}`
    );
    if (!userResponse.data.success) return null;

    const entity = this.orderRepository.create(
      mapper.map(input, CreateOrderInputDto, Order)
    );

    await this.orderRepository.save(entity);

    for (let i = 0; i < input.products.length; i++) {
      const product = input.products[i];

      const orderDetail = new OrderDetail();
      orderDetail.orderId = entity.id;
      orderDetail.productId = product.id;
      orderDetail.productName = product.productName;
      orderDetail.quantity = product.quantity;
      orderDetail.price = product.price;
      orderDetail.image = product.image;

      const orderDetailEntity = this.orderDetailRepository.create(orderDetail);

      await this.orderDetailRepository.save(orderDetailEntity);
    }

    return await this.getAsync(entity.id);
  }

  async updateAsync(
    id: number,
    input: UpdateOrderInputDto
  ): Promise<OrderDto | null> {
    try {
      const entity = await this.orderRepository.findOne({
        where: { id },
      });
      if (!entity) return null;
      entity.orderStatusId = input.orderStatusId;
      entity.updatedDate = new Date(Date());
      await this.orderRepository.save(entity);
      return await this.getAsync(entity.id);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getAsync(id: number): Promise<OrderDto | null> {
    try {
      const entity = await this.orderRepository.findOne({
        where: { id },
        relations: ["orderDetails", "orderStatus"],
      });
      if (!entity) return null;
      return mapper.map(entity, Order, OrderDto);
    } catch {
      return null;
    }
  }

  async getAllAsync(
    req: any,
    pageNumber: number,
    pageSize: number,
    keyword?: string
  ) {
    try {
      const { roleId, id } = req["user"];
      const searchCondition: any = keyword
        ? { receivedName: Like(`%${keyword}%`) }
        : {};
      if (roleId == 1) {
        searchCondition.userId = id;
      }

      const entities = await this.orderRepository.find({
        where: searchCondition,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["orderDetails", "orderStatus"],
      });

      const total = await this.orderRepository.count({
        where: searchCondition,
      });
      return {
        items: mapper.mapArray(entities, Order, OrderDto),
        total: total,
        currentPage: pageNumber,
        pageSize: pageSize,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new OrderService();

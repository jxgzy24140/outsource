import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import { CreateOrderInputDto, UpdateOrderInputDto, OrderDto } from "../dtos";
import { Order } from "../models/order.entity";
import axios from "axios";
import { CheckProductsResult } from "../dtos/checkProductsResult";
import { OrderDetail } from "../models/orderDetail.entity";
import { Transaction, getConnection } from "typeorm";
class OrderService {
  private readonly orderRepository;
  private readonly orderDetailRepository;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
  }

  async createAsync(input: CreateOrderInputDto): Promise<OrderDto | null> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      const checkProduct: any = await axios.post(
        "http://localhost:8081/products/createOrder",
        { products: input.products }
      );
      if (!checkProduct.data.status) return null;

      const products: CheckProductsResult[] = checkProduct.data.value;

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const newOrder = mapper.map(input, CreateOrderInputDto, Order);
      newOrder.orderStatusId = 1;
      newOrder.createdDate = new Date();
      const entity = this.orderRepository.create(newOrder);
      await this.orderRepository.save(entity);

      products.map(async (product) => {
        const orderDetail = new OrderDetail();
        orderDetail.orderId = entity.id;
        orderDetail.productId = product.id;
        orderDetail.productName = product.productName;
        orderDetail.quantity = product.quantity;
        orderDetail.price = product.price;
        orderDetail.image = product.image;
        const orderDetailEntity =
          this.orderDetailRepository.create(orderDetail);
        await this.orderRepository.save(orderDetailEntity);
      });

      await queryRunner.commitTransaction();

      return mapper.map(entity, Order, OrderDto);
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    }
  }

  async updateAsync(
    id: number,
    input: UpdateOrderInputDto
  ): Promise<OrderDto | null> {
    try {
      const entity = await this.orderRepository.findOne({ where: { id } });
      if (!entity) return null;
      entity.orderStatusId = input.orderStatusId;
      await this.orderRepository.save(entity);
      return entity;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getAsync(id: number): Promise<OrderDto | null> {
    try {
      const entity = await this.orderRepository.findOne({
        where: { id },
        relations: ["orderdetails", "orderStatus"],
      });
      if (!entity) return null;
      return mapper.map(entity, Order, OrderDto);
    } catch {
      return null;
    }
  }

  async getAllAsync(
    pageNumber: number,
    pageSize: number
  ): Promise<OrderDto[] | any[]> {
    try {
      const entities = await this.orderRepository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["orderdetails", "orderStatus"],
      });
      return entities.length ? mapper.mapArray(entities, Order, OrderDto) : [];
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new OrderService();

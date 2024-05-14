import { DataSource } from "typeorm";
import { Order } from "../models/order.entity";
import { OrderStatus } from "../models/orderStatus.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "product_db",
  synchronize: true,
  entities: [Order, OrderStatus],
});

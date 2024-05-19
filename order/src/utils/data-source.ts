import { DataSource } from "typeorm";
import { Order } from "../models/order.entity";
import { OrderStatus } from "../models/orderStatus.entity";
import { OrderDetail } from "../models/orderDetail.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3310,
  username: "root",
  password: "",
  database: "order_db",
  synchronize: true,
  entities: [Order, OrderStatus, OrderDetail],
});

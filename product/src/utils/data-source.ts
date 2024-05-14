import { DataSource } from "typeorm";
import { Product } from "../models/product.entity";
import { Category } from "../models/category.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "product_db",
  synchronize: true,
  entities: [Product, Category],
});

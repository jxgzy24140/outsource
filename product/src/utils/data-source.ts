import { DataSource } from "typeorm";
import { Product } from "../models/product.entity";
import { Category } from "../models/category.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3309,
  username: "root",
  password: "",
  database: "product_db",
  synchronize: true,
  entities: [Product, Category],
});

import { DataSource } from "typeorm";
import { User } from "../models/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3308,
  username: "root",
  password: "",
  database: "identity_db",
  synchronize: true,
  entities: [User],
});

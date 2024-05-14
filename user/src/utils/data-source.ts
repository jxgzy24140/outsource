import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { Role } from "../models/role.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "user_db",
  synchronize: true,
  entities: [User, Role],
});

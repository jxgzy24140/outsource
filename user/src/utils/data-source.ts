import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { Role } from "../models/role.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "",
  database: "user_db",
  synchronize: true,
  entities: [User, Role],
});

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class OrderStatus {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column({ nullable: false })
  name!: string;

  @OneToMany(() => Order, (order: Order) => order.orderStatus)
  orders?: Order[];
}

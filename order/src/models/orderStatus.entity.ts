import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: number;

  @OneToMany(() => Order, (order: Order) => order.orderStatus)
  orders?: Order[];
}

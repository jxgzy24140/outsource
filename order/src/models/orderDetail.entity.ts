import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class OrderDetail {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;
  
  @AutoMap()
  @Column({ nullable: false })
  orderId!: number;

  @AutoMap()
  @Column({ nullable: false })
  productId!: number;

  @AutoMap()
  @Column({ nullable: false })
  productName!: string;

  @AutoMap()
  @Column({ nullable: false })
  quantity!: number;

  @AutoMap()
  @Column({ nullable: false })
  price!: number;

  @AutoMap()
  @Column({ nullable: false })
  image!: string;

  @ManyToOne(() => Order)
  order!: Order;
}

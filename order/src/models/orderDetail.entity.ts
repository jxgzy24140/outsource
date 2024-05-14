import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  orderId!: number;

  @Column({ nullable: false })
  productId!: number;

  @Column({ nullable: false })
  productName!: string;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: false })
  image!: string;

  @ManyToOne(() => Order)
  order!: Order;
}

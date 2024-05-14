import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderStatus } from "./orderStatus.entity";
import { OrderDetail } from "./orderDetail.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  receivedName!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  orderStatusId!: number;

  @Column({ nullable: false })
  createdDate!: Date;

  @ManyToOne(() => OrderStatus)
  orderStatus!: OrderStatus;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[];
}

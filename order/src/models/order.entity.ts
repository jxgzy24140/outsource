import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderStatus } from "./orderStatus.entity";
import { OrderDetail } from "./orderDetail.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Order {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @Column()
  userId!: number;

  @AutoMap()
  @Column()
  receivedName!: string;

  @AutoMap()
  @Column()
  phoneNumber!: string;

  @AutoMap()
  @Column()
  address!: string;

  @AutoMap()
  @Column()
  orderStatusId!: number;

  @AutoMap()
  @Column()
  createdDate!: Date;

  @AutoMap()
  @Column({ nullable: true })
  updatedDate?: Date;

  @AutoMap()
  @Column()
  isDeleted!: boolean;

  @ManyToOne(() => OrderStatus)
  orderStatus?: OrderStatus;

  @AutoMap()
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[];
}

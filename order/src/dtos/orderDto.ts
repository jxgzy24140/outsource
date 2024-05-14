import { AutoMap } from "@automapper/classes";
import { OrderDetail } from "../models/orderDetail.entity";

export class OrderDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  userId!: number;

  @AutoMap()
  receivedName!: string;

  @AutoMap()
  address!: string;

  @AutoMap()
  orderStatusId!: number;

  @AutoMap()
  createdDate!: Date;

  @AutoMap()
  orderDetails!: OrderDetail[] | [];
}

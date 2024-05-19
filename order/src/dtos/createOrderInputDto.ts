import { AutoMap } from "@automapper/classes";

export class CreateOrderInputDto {
  products!: OrderProducts[];

  @AutoMap()
  userId!: number;

  @AutoMap()
  receivedName!: string;

  @AutoMap()
  phoneNumber!: string;

  @AutoMap()
  address!: string;
}

class OrderProducts {
  id!: number;
  productName!: string;
  quantity!: number;
  price!: number;
  image!: string;
}

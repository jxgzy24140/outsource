export class CreateOrderInputDto {
  products!: OrderProducts[];
  orderStatusId?: number;
  userId!: string;
  createdDate?: Date;
}

class OrderProducts {
  productId!: number;
  quantity!: number;
}

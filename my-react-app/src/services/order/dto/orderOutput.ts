export interface IOrderOutput {
  id: number;
  userId: string;
  receivedName: string;
  address: string;

  createdDate: Date;
  orderStatusId: number;
  orderStatusName: string;
  isDeleted: boolean;
  orderDetails: IProductOrderDetail[];
}

interface IProductOrderDetail {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

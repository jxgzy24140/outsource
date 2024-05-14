export interface IOrderOutput {
  id: number;
  orderId: string;
  userId: string;
  receiveName: string;
  phoneNumber: number;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  amount: number;

  shippingMethod: string;
  shippingMethodId: number;
  shippingFee: number;

  createdDate: Date;
  orderStatus: string;
  orderStatusId: number;
  paymentId: number | null;
  paymentMethod: string;
  products: IProductOrderDetail[];
}

interface IProductOrderDetail {
  productId: number;
  orderDetailId: number;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  isRated: boolean;
}

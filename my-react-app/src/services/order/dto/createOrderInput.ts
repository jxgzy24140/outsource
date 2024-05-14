import { ICreateProductOrderDetailInput } from "@/services/order/dto/createProductOrderDetailInput";

export interface ICreateOrderInput {
  userId: number;
  receiveName: string;
  phoneNumber: number;
  email: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  amount: number;
  shippingFee: number;
  paymentMethodId: number;
  shippingMethodId: number;
  products: ICreateProductOrderDetailInput[];
}

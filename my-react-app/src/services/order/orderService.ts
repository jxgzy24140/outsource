import http from "@/services/httpService";
import {
  ICreateOrderInput,
  OrderOutputDto,
  IUpdateOrderInput,
  ShippingMethodOutputDto,
  PaymentMethodOutputDto,
} from "@/services/order/dto";
import IResponseWithPagination from "@/services/responseWithPaginationDto";
import { IHttpRequest } from "../httpRequestDto";

class OrderService {
  // Order
  public async createOrder(
    input: ICreateOrderInput
  ): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.post("orders", input);
    return response.data;
  }

  public async updateOrder(
    id: number,
    input: IUpdateOrderInput
  ): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.patch(`orders/${id}`, input);
    return response.data;
  }

  public async deleteOrder(id: string): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.delete(`orders/${id}`);
    return response.data;
  }

  public async getOrder(id: string): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.get(`orders/${id}`);
    return response.data;
  }

  public async getOrders(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<OrderOutputDto>>> {
    const response = await http.get("orders", {
      params: { pageSize, pageNumber },
    });
    return response.data;
  }

  // Order Status
  // public async CreateOrderStatus(
  //   input: ICreateOrUpdateOrderStatusInput
  // ): Promise<IHttpRequest<OrderStatusOutputDto>> {
  //   const response = await http.post("category", input);
  //   return response.data.result;
  // }

  // public async UpdateOrderStatus(
  //   input: ICreateOrUpdateOrderStatusInput
  // ): Promise<IHttpRequest<OrderStatusOutputDto>> {
  //   const response = await http.patch("order", input);
  //   return response.data.result;
  // }

  // public async DeleteOrderStatus(
  //   id: string
  // ): Promise<IHttpRequest<OrderStatusOutputDto>> {
  //   const response = await http.delete(`order/${id}`);
  //   return response.data.result;
  // }

  // public async GetOrderStatus(
  //   id: string
  // ): Promise<IHttpRequest<OrderStatusOutputDto>> {
  //   const response = await http.get(`order/${id}`);
  //   return response.data.result;
  // }

  // public async GetListOrderStatus(
  //   pageNumber: number,
  //   pageSize: number
  // ): Promise<IHttpRequest<IResponseWithPagination<OrderStatusOutputDto>>> {
  //   const response = await http.get("orders", {
  //     params: { pageSize, pageNumber },
  //   });
  //   return response.data.result;
  // }

  // Shipping Methods
  // public async CreateShippingMethod(
  //   input: ICreateOrUpdateShippingmethodInput
  // ): Promise<IHttpRequest<ShippingMethodOutputDto>> {
  //   const response = await http.post("orders", input);
  //   return response.data.result;
  // }

  // public async UpdateShippingMethod(
  //   input: ICreateOrUpdateShippingmethodInput
  // ): Promise<IHttpRequest<ShippingMethodOutputDto>> {
  //   const response = await http.patch("orders", input);
  //   return response.data.result;
  // }

  // public async DeleteShippingMethod(
  //   id: string
  // ): Promise<IHttpRequest<ShippingMethodOutputDto>> {
  //   const response = await http.delete(`orders/${id}`);
  //   return response.data.result;
  // }

  // public async GetShippingMethod(
  //   id: string
  // ): Promise<IHttpRequest<ShippingMethodOutputDto>> {
  //   const response = await http.get(`orders/${id}`);
  //   return response.data.result;
  // }

  public async getShippingMethods(): Promise<
    IHttpRequest<IResponseWithPagination<ShippingMethodOutputDto>>
  > {
    const response = await http.get("orders/shipping-methods");
    return response.data;
  }

  // Payment Methods
  // public async CreatePaymentMethod(
  //   input: ICreateOrUpdatePaymentMethodInput
  // ): Promise<IHttpRequest<PaymentMethodOutputDto>> {
  //   const response = await http.post("api/category", input);
  //   return response.data.result;
  // }

  // public async UpdatePaymentMethod(
  //   input: ICreateOrUpdatePaymentMethodInput
  // ): Promise<IHttpRequest<PaymentMethodOutputDto>> {
  //   const response = await http.patch("api/order", input);
  //   return response.data.result;
  // }

  // public async DeletePaymentMethod(
  //   id: string
  // ): Promise<IHttpRequest<PaymentMethodOutputDto>> {
  //   const response = await http.delete(`api/order/${id}`);
  //   return response.data.result;
  // }

  // public async GetPaymentMethod(
  //   id: string
  // ): Promise<IHttpRequest<PaymentMethodOutputDto>> {
  //   const response = await http.get(`api/order/${id}`);
  //   return response.data.result;
  // }

  public async getPaymentMethods(): Promise<
    IHttpRequest<IResponseWithPagination<PaymentMethodOutputDto>>
  > {
    const response = await http.get("orders/paymen-methods");
    return response.data;
  }
}

export default new OrderService();

import http from "@/services/httpService";
import {
  ICreateOrderInput,
  OrderOutputDto,
  IUpdateOrderInput,
} from "@/services/order/dto";
import IResponseWithPagination from "@/services/responseWithPaginationDto";
import { IHttpRequest } from "../httpRequestDto";

class OrderService {
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
    const response = await http.put(
      `http://localhost:8083/api/v1/orders/${id}`,
      input
    );
    return response.data;
  }

  public async deleteOrder(id: string): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.delete(
      `http://localhost:8083/api/v1/orders/${id}`
    );
    return response.data;
  }

  public async getOrder(id: string): Promise<IHttpRequest<OrderOutputDto>> {
    const response = await http.get(
      `http://localhost:8083/api/v1/orders/${id}`
    );
    return response.data;
  }

  public async getOrders(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<OrderOutputDto>>> {
    const response = await http.get("http://localhost:8083/api/v1/orders", {
      params: { pageSize, pageNumber },
    });
    return response.data;
  }
}

export default new OrderService();

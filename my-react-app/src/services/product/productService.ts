import http from "@/services/httpService";
import IResponseWithPagination from "@/services/responseWithPaginationDto";
import {
  ICreateProductInput,
  IUpdateProductInput,
  ProductOutputDto,
} from "@/services/product/dto";
import { IHttpRequest } from "../httpRequestDto";
class ProductService {
  public async createProduct(
    input: ICreateProductInput
  ): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.post(
      "http://localhost:8082/api/v1/products",
      input
    );
    return response.data;
  }

  public async updateProduct(
    id: number,
    input: IUpdateProductInput
  ): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.put(
      `http://localhost:8082/api/v1/products/${id}`,
      input
    );
    return response.data;
  }

  public async deleteProduct(
    id: number
  ): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.delete(
      `http://localhost:8082/api/v1/products/${id}`
    );
    return response.data;
  }

  public async getProduct(id: number): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.get(
      `http://localhost:8082/api/v1/products/${id}`
    );
    return response.data;
  }

  public async getProducts(
    pageNumber: number,
    pageSize: number,
    typeId?: number,
    keyword?: string
  ): Promise<IHttpRequest<IResponseWithPagination<ProductOutputDto>>> {
    const response = await http.get("http://localhost:8082/api/v1/products", {
      params: { pageSize, pageNumber, typeId, keyword },
    });
    return response.data;
  }
}

export default new ProductService();

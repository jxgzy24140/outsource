import http from "@/services/httpService";
import IResponseWithPagination from "@/services/responseWithPaginationDto";
import {
  ICreateProductInput,
  IUpdateProductInput,
  ProductOutputDto,
} from "@/services/product/dto";
import { IHttpRequest } from "../httpRequestDto";
import { AxiosRequestConfig } from "axios";
class ProductService {
  public async createProduct(
    input: ICreateProductInput
  ): Promise<IHttpRequest<ProductOutputDto>> {
    if (input.imageFile) {
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await http.post("products", formData, config);
      return response.data;
    }
    const response = await http.post("products", input);
    return response.data;
  }

  public async updateProduct(
    id: number,
    input: IUpdateProductInput
  ): Promise<IHttpRequest<ProductOutputDto>> {
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await http.patch(`products/${id}`, formData, config);
    return response.data;
  }

  public async deleteProduct(
    id: number
  ): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.delete(`products/${id}`);
    return response.data;
  }

  public async getProduct(id: number): Promise<IHttpRequest<ProductOutputDto>> {
    const response = await http.get(`products/${id}`);
    return response.data;
  }

  public async getProductCatalog(
    categoryName: string,
    pageNumber: number,
    pageSize: number,
    scat?: string,
    min?: string,
    max?: string,
    sort?: string
  ): Promise<IHttpRequest<IResponseWithPagination<ProductOutputDto>>> {
    let params = {};
    if (pageNumber) params["page"] = pageNumber;
    if (pageSize) params["size"] = pageSize;
    if (scat) params["scat"] = scat;
    if (min) params["min"] = min;
    if (max) params["max"] = max;
    if (sort) params["sort"] = sort;
    const response = await http.get(
      `products/product-catalog/${categoryName}`,
      {
        params: params,
      }
    );
    return response.data;
  }

  public async getProducts(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<ProductOutputDto>>> {
    const response = await http.get("products", {
      params: { pageSize, pageNumber },
    });
    return response.data;
  }

  public async getHomeProducts() {
    const response = await http.get("products/get-home-products");
    return response.data;
  }
}

export default new ProductService();

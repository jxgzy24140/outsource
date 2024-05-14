import http from "@/services/httpService";
import {
  ICreateOrUpdateCategoryInput,
  CategoryOutputDto,
} from "@/services/category/dto";
import IResponseWithPagination from "@/services/responseWithPaginationDto";
import { IHttpRequest } from "../httpRequestDto";

class CategoryService {
  public async createCategory(
    input: ICreateOrUpdateCategoryInput
  ): Promise<IHttpRequest<CategoryOutputDto>> {
    const response = await http.post("categories", input);
    return response.data;
  }

  public async updateCategory(
    id: number,
    input: ICreateOrUpdateCategoryInput
  ): Promise<IHttpRequest<CategoryOutputDto>> {
    const response = await http.patch(`categories/${id}`, input);
    return response.data;
  }

  public async deleteCategory(
    id: number
  ): Promise<IHttpRequest<CategoryOutputDto>> {
    const response = await http.delete(`categories/${id}`);
    return response.data;
  }

  public async getCategory(
    id: number
  ): Promise<IHttpRequest<CategoryOutputDto>> {
    const response = await http.get(`categories/${id}`);
    return response.data;
  }

  public async getCategories(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<CategoryOutputDto>>> {
    const response = await http.get("categories", {
      params: { pageSize, pageNumber },
    });
    return response.data;
  }
}

export default new CategoryService();

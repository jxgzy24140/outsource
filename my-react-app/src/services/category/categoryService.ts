import http from "@/services/httpService";

class CategoryService {
  // public async createCategory(
  //   input: ICreateOrUpdateCategoryInput
  // ): Promise<IHttpRequest<CategoryOutputDto>> {
  //   const response = await http.post("categories", input);
  //   return response.data;
  // }

  // public async updateCategory(
  //   id: number,
  //   input: ICreateOrUpdateCategoryInput
  // ): Promise<IHttpRequest<CategoryOutputDto>> {
  //   const response = await http.patch(`categories/${id}`, input);
  //   return response.data;
  // }

  // public async deleteCategory(
  //   id: number
  // ): Promise<IHttpRequest<CategoryOutputDto>> {
  //   const response = await http.delete(`categories/${id}`);
  //   return response.data;
  // }

  // public async getCategory(
  //   id: number
  // ): Promise<IHttpRequest<CategoryOutputDto>> {
  //   const response = await http.get(`categories/${id}`);
  //   return response.data;
  // }

  public async getCategories() {
    const response = await http.get("http://localhost:8082/api/v1/categories");
    return response.data;
  }
}

export default new CategoryService();

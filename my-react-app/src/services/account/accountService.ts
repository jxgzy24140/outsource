import http from "@/services/httpService";
import { IRegisterInput } from "@/services/account/dto/userCreateInputDto";
import { UserOutputDto, IUpdateUserInput } from "./dto";
import { IHttpRequest } from "../httpRequestDto";
import IResponseWithPagination from "../responseWithPaginationDto";

class AccountService {
  async createUser(
    input: IRegisterInput
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.post(
      "http://localhost:8080/api/v1/users",
      input
    );
    return response.data;
  }

  async updateUser(
    id: number,
    input: IUpdateUserInput
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.put(
      `http://localhost:8080/api/v1/users/${id}`,
      input
    );
    return response.data;
  }

  async deleteUser(id: any): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.delete(
      `http://localhost:8080/api/v1/users/${id}`
    );
    return response.data;
  }

  async getUsers(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<UserOutputDto>>> {
    const response = await http.get("http://localhost:8080/api/v1/users", {
      params: { pageNumber, pageSize },
    });
    return response.data;
  }

  async getUser(id: any): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.get(`http://localhost:8080/api/v1/users/${id}`);
    return response.data;
  }

  async getRoles() {
    const response = await http.get("http://localhost:8080/api/v1/roles");
    return response.data;
  }
}

export default new AccountService();

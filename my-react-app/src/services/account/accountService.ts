import http from "@/services/httpService";
import { IRegisterInput } from "@/services/account/dto/userCreateInputDto";
import {
  IChangeUserPassword,
  UserOutputDto,
  IUpdateUserInput,
  IUpdateUserRoleAndActiveInputDto,
} from "./dto";
import { IHttpRequest } from "../httpRequestDto";
import IResponseWithPagination from "../responseWithPaginationDto";

class AccountService {
  async createUser(
    registerInput: IRegisterInput
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.post("users", registerInput);
    return response.data;
  }

  async updateUser(
    input: IUpdateUserInput
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.patch("users", input);
    return response.data;
  }

  async deleteUser(id: any): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.delete(`users/${id}`);
    return response.data;
  }

  async getUsers(
    pageNumber: number,
    pageSize: number
  ): Promise<IHttpRequest<IResponseWithPagination<UserOutputDto>>> {
    const response = await http.get("users", {
      params: { pageNumber, pageSize },
    });
    return response.data;
  }

  async getUser(id: any): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.get(`users/${id}`);
    return response.data;
  }

  async updateRoleAndActive(
    id: string,
    input: IUpdateUserRoleAndActiveInputDto
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.patch(
      `users/update-user-role-active/${id}`,
      input
    );
    return response.data;
  }

  async changePassword(
    id: string,
    input: IChangeUserPassword
  ): Promise<IHttpRequest<UserOutputDto>> {
    const response = await http.patch(`users/change-password/${id}`, input);
    return response.data;
  }

  async verifyAccount(id: string, secretKey: string): Promise<boolean> {
    const response = await http.get(`users/verify`, {
      params: { user_id: id, secret_key: secretKey },
    });
    return response.data;
  }
}

export default new AccountService();

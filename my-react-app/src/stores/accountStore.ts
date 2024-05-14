import accountService from "@/services/account/accountService";
import type {
  IRegisterInput,
  IUpdateUserInput,
  IUpdateUserRoleAndActiveInputDto,
  UserOutputDto,
} from "@/services/account/dto";
import type IResponseWithPagination from "@/services/responseWithPaginationDto";
import { action, makeAutoObservable, observable } from "mobx";

class AccountStore {
  @observable users!: IResponseWithPagination<UserOutputDto>;
  @observable editUser:
    | IRegisterInput
    | IUpdateUserInput
    | UserOutputDto
    | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async getUsers(pageNumber: number, pageSize: number) {
    const response = await accountService.getUsers(pageNumber, pageSize);
    if (response.success && response.data) {
      this.users = response.data;
    }
  }

  @action
  async getUser(id: string) {
    const response = await accountService.getUser(id);
    if (response.success && response.data) {
      this.editUser = response.data;
    }
  }

  @action
  async updateUserRoleAndActive(
    id: string,
    input: IUpdateUserRoleAndActiveInputDto
  ) {
    const response = await accountService.updateRoleAndActive(id, input);
    if (response.success && response?.data) {
      this.editUser = null;
      this.users.items = this.users.items.map((user) => {
        if (response.data && user.id == response.data.id) user = response.data;
        return user;
      });
      return true;
    }
    return false;
  }

  @action
  async deleteUser(id: string) {
    const response = await accountService.deleteUser(id);
    if (response.success && response.data) {
      this.editUser = null;
      this.users.items = this.users.items.filter((user: any) => {
        return response.data && user.userId != response.data.id;
      });
      this.users.total = this.users.total - 1;
      return true;
    }
    return false;
  }

  cleanUp() {
    this.editUser = null;
  }
}

export default AccountStore;

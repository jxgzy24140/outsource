import accountService from "@/services/account/accountService";
import type {
  IRegisterInput,
  IUpdateUserInput,
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
  @observable roles: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async getRoles() {
    const response: any = await accountService.getRoles();
    this.roles = response;
  }

  @action
  async getUsers(pageNumber: number, pageSize: number) {
    const response: any = await accountService.getUsers(pageNumber, pageSize);
    this.users = response;
  }

  @action
  async getUser(id: string) {
    const response = await accountService.getUser(id);
    if (response.success && response.data) {
      this.editUser = response.data;
    }
  }

  @action
  async deleteUser(id: string) {
    const response = await accountService.deleteUser(id);
    if (response.success) {
      this.editUser = null;
      this.users.items = this.users.items.filter((user: any) => {
        return response.data && user.userId != response.data.id;
      });
      this.users.total = this.users.total - 1;
      return true;
    }
    return false;
  }

  @action
  async updateUser(id: number, input: any) {
    const response: any = await accountService.updateUser(id, input);

    if (response.success) {
      this.users.items = this.users.items.map((user: any) => {
        if (user.id === response.data.id) {
          return { ...user, ...response.data };
        }
        return user;
      });
      return true;
    }
    return false;
  }

  cleanUp() {
    this.editUser = null;
  }
}

export default AccountStore;

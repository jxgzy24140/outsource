import type { ILoginInput, UserOutputDto } from "@/services/account/dto";
import authService from "@/services/auth/authService";
import { action, makeAutoObservable, observable } from "mobx";

class AuthenticationStore {
  @observable isAuthenticated: boolean = false;
  @observable userProfile: UserOutputDto | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  public async getAuthentication() {
    if (sessionStorage.getItem("accessToken")) {
      const result = await authService.getCurrentLoginInformation();
      console.log(result);
      
      if (result.success) {
        this.userProfile = result.data;
        this.isAuthenticated = true;
      } else {
        this.userProfile = result.data;
        this.isAuthenticated = true;
      }
    } else this.isAuthenticated = false;
  }

  @action
  public async login(input: ILoginInput): Promise<any> {
    const response: any = await authService.login(input);
    if (response && response.success && response.message) {
      sessionStorage.setItem("accessToken", response.message.accessToken);
      response.message.user.roleId == 1
        ? (window.location.href = "/")
        : (window.location.href = "/admin");
      this.isAuthenticated = true;
      this.userProfile = response.message.user;
      return true;
    }
    if (response && !response.success) {
      sessionStorage.removeItem("accessToken");
      this.isAuthenticated = false;
      this.userProfile = null;
    }
  }

  @action
  public async logout(): Promise<any> {
    // await authService.logOut();
    sessionStorage.removeItem("accessToken");
    // this.userProfile = null;
    // this.isAuthenticated = false;
    window.location.href = "/auth/login";
  }
}
export default AuthenticationStore;

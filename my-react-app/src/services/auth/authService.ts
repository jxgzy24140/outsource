import http from "@/services/httpService";
import { ILoginInput, ILoginOutput } from "@/services/auth/dto";
import { IHttpRequest } from "../httpRequestDto";

class AuthService {
  async login(input: ILoginInput): Promise<IHttpRequest<ILoginOutput>> {
    const response = await http.post(
      "http://localhost:8081/api/v1/identity/login",
      input
    );
    console.log("res: ", response);

    return response.data.result;
  }

  async getCurrentLoginInformation() {
    const response = await http.get(
      "http://localhost:8081/api/v1/identity/currentLoginInformation"
    );
    return response.data;
  }
}

export default new AuthService();

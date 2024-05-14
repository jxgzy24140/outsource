import { UserOutputDto } from "@/services/account/dto";

export interface ILoginOutput {
  accessToken: string;
  user: UserOutputDto;
}

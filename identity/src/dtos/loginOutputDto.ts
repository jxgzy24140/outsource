import { UserDto } from "./userDto";

export class LoginOutputDto {
  success!: boolean;
  message?: {
    accessToken: string;
    user: UserDto;
  };
}

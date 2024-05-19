import { UserDto } from "./userDto";
export declare class LoginOutputDto {
    success: boolean;
    message?: {
        accessToken: string;
        user: UserDto;
    };
}

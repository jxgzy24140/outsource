import { LoginInputDto, LoginOutputDto } from "../dtos";
declare class IdentityService {
    private readonly accountRepository;
    constructor();
    loginAsync(input: LoginInputDto): Promise<LoginOutputDto | null>;
    createAccount(input: any): Promise<void>;
    updateAccount(input: any): Promise<void>;
    deleteAccount(input: any): Promise<void>;
}
declare const _default: IdentityService;
export default _default;

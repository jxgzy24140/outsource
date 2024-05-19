import { LoginInputDto, LoginOutputDto } from "../dtos";
declare class IdentityService {
    private readonly accountRepository;
    constructor();
    loginAsync(input: LoginInputDto): Promise<LoginOutputDto | null>;
    createAccount(input: any): Promise<void>;
    updateAccount(input: any): Promise<void>;
    deleteAccount(input: any): Promise<void>;
    getCurrentLoginInformation(id: any): Promise<{
        id: any;
        fullName: any;
        email: any;
        roleId: any;
    }>;
}
declare const _default: IdentityService;
export default _default;

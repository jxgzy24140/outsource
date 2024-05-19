import { CreateUserInputDto, UpdateUserInputDto, UserDto } from "../dtos/user";
import { User } from "../models/user.entity";
declare class UserService {
    private readonly userRepository;
    constructor();
    createUser(input: CreateUserInputDto): Promise<User | null>;
    updateUser(id: number, input: UpdateUserInputDto): Promise<UserDto | null>;
    delete(id: number): Promise<boolean | null>;
    get(id: number): Promise<UserDto | null>;
    getAll(pageNumber: number, pageSize: number, keyword?: string): Promise<{
        items: UserDto[];
        total: number;
        currentPage: number;
        pageSize: number;
    }>;
}
declare const _default: UserService;
export default _default;

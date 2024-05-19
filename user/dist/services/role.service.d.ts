import { Role } from "../models/role.entity";
import { CreateOrUpdateRoleInputDto, RoleDto } from "../dtos/role";
declare class RoleService {
    private roleRepository;
    createRole(input: Role): Promise<Role | null>;
    updateRole(id: number, input: CreateOrUpdateRoleInputDto): Promise<RoleDto | null>;
    delete(id: number): Promise<null | undefined>;
    get(id: number): Promise<Role | null>;
    getAll(): Promise<Role[]>;
}
declare const _default: RoleService;
export default _default;

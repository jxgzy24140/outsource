import { Role } from "./role.entity";
export declare class User {
    id: number;
    roleId: number;
    fullName: string;
    email: string;
    password: string;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    role: Role;
}

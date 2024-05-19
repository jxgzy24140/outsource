import { User } from "./user.entity";
export declare class Role {
    id: number;
    roleName: string;
    createdDate: Date;
    updatedDate?: Date;
    isDeleted: boolean;
    users?: User[];
}

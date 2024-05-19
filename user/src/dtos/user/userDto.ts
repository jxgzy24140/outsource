import { AutoMap } from "@automapper/classes";

export class UserDto {
  @AutoMap()
  id!: number;
  
  @AutoMap()
  roleId!: number;
  
  @AutoMap()
  roleName!: string;
  
  @AutoMap()
  fullName!: string;
  
  @AutoMap()
  email!: string;

  @AutoMap()
  createdDate!: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  isDeleted!: boolean;
}

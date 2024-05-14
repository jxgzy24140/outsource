import { AutoMap } from "@automapper/classes";

export class UserDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  roleId!: number;
  @AutoMap()
  roleName!: string;
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  scores!: number;
  @AutoMap()
  email!: string;
  @AutoMap()
  createdDate!: Date;
  @AutoMap()
  updatedDate?: Date;
}

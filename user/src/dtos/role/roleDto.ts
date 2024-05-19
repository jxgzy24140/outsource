import { AutoMap } from "@automapper/classes";

export class RoleDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  roleName!: string;

  @AutoMap()
  createdDate!: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  isDeleted!: boolean;
}

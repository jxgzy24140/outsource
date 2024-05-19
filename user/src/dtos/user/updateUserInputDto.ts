import { AutoMap } from "@automapper/classes";

export class UpdateUserInputDto {
  @AutoMap()
  id!: number;
  
  @AutoMap()
  roleId?: number;
  
  @AutoMap()
  fullName?: string;
  
  @AutoMap()
  email?: string;

  @AutoMap()
  password?: string
}

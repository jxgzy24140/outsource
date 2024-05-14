import { AutoMap } from "@automapper/classes";

export class UpdateUserInputDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  roleId?: number;
  @AutoMap()
  firstName?: string;
  @AutoMap()
  lastName?: string;
  @AutoMap()
  email?: string;
}

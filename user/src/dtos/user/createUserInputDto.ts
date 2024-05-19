import { AutoMap } from "@automapper/classes";

export class CreateUserInputDto {
  @AutoMap()
  fullName!: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  password!: string;

  @AutoMap()
  roleId?: number;
}

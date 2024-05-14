export class CreateUserInputDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  roleId?: number;
}

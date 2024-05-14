export interface IUpdateUserInput {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  gender?: boolean;
  active?: boolean;
  verify?: boolean;
  avatar?: File;
  roleId?: number;
}

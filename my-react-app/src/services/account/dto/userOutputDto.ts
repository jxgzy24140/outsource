export interface IUserOutputDto {
  id: number;
  fullName: string;
  email: string;
  
  roleId: number;
  roleName: string;

  createdDate: Date;
  updatedDate: Date;
  isDeleted: boolean;
}

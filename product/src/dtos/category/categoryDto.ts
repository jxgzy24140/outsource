import { AutoMap } from "@automapper/classes";

export class CategoryDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  categoryName!: string;
  @AutoMap()
  createdDate!: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  isDeleted!: boolean;
}

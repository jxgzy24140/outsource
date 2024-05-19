import { AutoMap } from "@automapper/classes";

export class ProductDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  categoryId!: number;
  @AutoMap()
  categoryName!: string;
  @AutoMap()
  typeId!: number;
  @AutoMap()
  productName!: string;
  @AutoMap()
  price!: string;
  @AutoMap()
  size!: number;
  @AutoMap()
  image!: string;
  @AutoMap()
  quantity!: string;

  @AutoMap()
  createdDate!: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  isDeleted!: boolean;
}

import { AutoMap } from "@automapper/classes";

export class UpdateProductInputDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  categoryId!: number;
  @AutoMap()
  typeId!: number;
  @AutoMap()
  productName!: string;
  @AutoMap()
  price!: number;
  @AutoMap()
  image!: string;
  @AutoMap()
  quantity!: number;
  @AutoMap()
  size!: number;

  @AutoMap()
  updatedDate?: Date;
}

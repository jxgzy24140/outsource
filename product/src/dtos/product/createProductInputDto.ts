import { AutoMap } from "@automapper/classes";

export class CreateProductInputDto {
  @AutoMap()
  categoryId!: number;
  @AutoMap()
  typeId!: number;
  @AutoMap()
  productName!: string;
  @AutoMap()
  price!: string;
  @AutoMap()
  image!: string;
  @AutoMap()
  quantity!: number;
  @AutoMap()
  size!: number;
}

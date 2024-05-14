import { AutoMap } from "@automapper/classes";

export class ProductDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  categoryId!: number;
  @AutoMap()
  productName!: string;
  @AutoMap()
  price!: string;
  @AutoMap()
  image!: string;
  @AutoMap()
  quantity!: string;
}

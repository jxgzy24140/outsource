import { AutoMap } from "@automapper/classes";

export class CheckProductsResult {
  @AutoMap()
  id!: number;
  @AutoMap()
  productName!: string;
  @AutoMap()
  price!: number;
  @AutoMap()
  quantity!: number;
  @AutoMap()
  image!: string;
}

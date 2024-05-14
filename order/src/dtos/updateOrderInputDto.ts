import { AutoMap } from "@automapper/classes";

export class UpdateOrderInputDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  orderStatusId!: number;
}

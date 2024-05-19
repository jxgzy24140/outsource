import { AutoMap } from "@automapper/classes";

export class CreateOrUpdateCategoryInputDto {
  @AutoMap()
  id?: number;
  @AutoMap()
  categoryName!: string;
}

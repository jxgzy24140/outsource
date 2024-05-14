import {
  MappingProfile,
  createMap,
  forMember,
  ignore,
  mapFrom,
  addProfile,
  createMapper,
} from "@automapper/core";
import { classes } from "@automapper/classes";
import { Product } from "../models/product.entity";
import { ProductDto } from "../dtos/product";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    Product,
    ProductDto,
    forMember(
      (dest: any) => dest.categoryName,
      mapFrom((x: any) => x.category.cateogryName)
    )
  );
};

const mapper = createMapper({
  strategyInitializer: classes(),
});
addProfile(mapper, userProfile);

export default mapper;

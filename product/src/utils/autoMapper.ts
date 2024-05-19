import {
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
  addProfile,
  createMapper,
} from "@automapper/core";
import { classes } from "@automapper/classes";
import { Product } from "../models/product.entity";
import {
  CreateProductInputDto,
  ProductDto,
  UpdateProductInputDto,
} from "../dtos/product";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    Product,
    ProductDto,
    forMember(
      (dest: any) => dest.categoryName,
      mapFrom((x: any) => x.category.categoryName)
    )
  );

  createMap(mapper, UpdateProductInputDto, Product);
  createMap(mapper, CreateProductInputDto, Product);
};

const mapper = createMapper({
  strategyInitializer: classes(),
});
addProfile(mapper, userProfile);

export default mapper;

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
import { Order } from "../models/order.entity";
import { OrderDto } from "../dtos";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    Order,
    OrderDto,
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

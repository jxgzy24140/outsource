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
import { CreateOrderInputDto, OrderDto, UpdateOrderInputDto } from "../dtos";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    Order,
    OrderDto,
    forMember(
      (dest: any) => dest.orderStatusName,
      mapFrom((x: any) => x.orderStatus.name)
    ),
    forMember(
      (dest: any) => dest.orderDetails,
      mapFrom((x: any) => x.orderDetails)
    )
  );

  createMap(
    mapper,
    CreateOrderInputDto,
    Order,
    forMember(
      (dest) => dest.orderStatusId,
      mapFrom((x) => 1)
    ),
    forMember(
      (dest) => dest.createdDate,
      mapFrom((x) => {
        return new Date(Date());
      })
    ),
    forMember(
      (dest) => dest.isDeleted,
      mapFrom((x) => false)
    )
  );
};

const mapper = createMapper({
  strategyInitializer: classes(),
});
addProfile(mapper, userProfile);

export default mapper;

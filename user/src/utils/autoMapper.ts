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
import { User } from "../models/user.entity";
import { CreateUserInputDto, UserDto } from "../dtos/user";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    User,
    UserDto,
    forMember(
      (dest: any) => dest.roleName,
      mapFrom((x: any) => x.role.roleName)
    ),
    forMember((dest: any) => dest.password, ignore())
  );
  createMap(
    mapper,
    CreateUserInputDto,
    User,
    forMember(
      (dest: any) => dest.roleId,
      mapFrom((x) => 1)
    ),
    forMember(
      (dest: any) => dest.createdDate,
      mapFrom((x) => new Date(Date()))
    ),
    forMember(
      (dest: any) => dest.isDeleted,
      mapFrom((x) => false)
    )
  );
};

const mapper = createMapper({
  strategyInitializer: classes(),
});
addProfile(mapper, userProfile);

export default mapper;

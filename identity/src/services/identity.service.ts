import bcrypt from "bcryptjs";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/user.entity";
import { LoginInputDto, LoginOutputDto, UserDto } from "../dtos";
import jwt from "jsonwebtoken";

class IdentityService {
  private readonly userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async loginAsync(input: LoginInputDto): Promise<LoginOutputDto | null> {
    try {
      const entity = await this.userRepository.findOne({
        where: { email: input.email },
        relations: ["role"],
      });
      if (!entity)
        return {
          success: false,
        };
      const isValidPassword = await bcrypt.compare(
        input.password,
        entity.password
      );
      if (!isValidPassword)
        return {
          success: false,
        };

      const userOutput = new UserDto();
      userOutput.id = entity.id;
      userOutput.firstName = entity.firstName;
      userOutput.lastName = entity.lastName;
      userOutput.email = entity.email;
      userOutput.roleId = entity.roleId;
      userOutput.roleName = entity.role.roleName;

      const payload = {
        id: entity.id,
        email: entity.email,
        firstName: entity.firstName,
        lastName: entity.lastName,
      };
      const tokenSecretKey = process.env.TOKEN_SECRET_KEY ?? "";
      const accessToken = jwt.sign(payload, tokenSecretKey, {
        expiresIn: "1h",
      });
      return {
        success: true,
        message: {
          accessToken: accessToken,
          user: userOutput,
        },
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new IdentityService();

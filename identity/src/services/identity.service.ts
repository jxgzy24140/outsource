import bcrypt from "bcryptjs";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/user.entity";
import { LoginInputDto, LoginOutputDto, UserDto } from "../dtos";
import jwt from "jsonwebtoken";

class IdentityService {
  private readonly accountRepository;
  constructor() {
    this.accountRepository = AppDataSource.getRepository(User);
  }

  async loginAsync(input: LoginInputDto): Promise<LoginOutputDto | null> {
    try {
      const entity = await this.accountRepository.findOne({
        where: { email: input.email, isDeleted: false },
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

      const payload = {
        id: entity.userId,
        email: entity.email,
        fullName: entity.fullName,
        roleId: entity.roleId,
      };
      const tokenSecretKey = process.env.TOKEN_SECRET_KEY ?? "";
      const accessToken = jwt.sign(payload, tokenSecretKey, {
        expiresIn: "1h",
      });
      return {
        success: true,
        message: {
          accessToken: accessToken,
          user: {
            id: entity.userId,
            email: entity.email,
            fullName: entity.fullName,
            roleId: entity.roleId,
          },
        },
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async createAccount(input: any) {
    const account: any = this.accountRepository.create(input);
    account.createdDate = new Date(Date());
    account.isDeleted = false;
    await this.accountRepository.save(account);
  }

  async updateAccount(input: any) {
    const entity: any = await this.accountRepository.findOne({
      where: { userId: input.userId },
    });
    if (entity != null) {
      entity.fullName = input.fullName;
      entity.email = input.email;
      entity.roleId = input.roleId;
      if (input.password) entity.password = input.password;
    }
    entity.updatedDate = new Date(Date());
    await this.accountRepository.save(entity);
  }

  async deleteAccount(input: any) {
    const account: any = await this.accountRepository.findOne({
      where: { userId: input.userId },
    });
    if (account != null) {
      account.isDeleted = true;
      account.updatedDate = new Date(Date());
    }
    await this.accountRepository.save(account);
  }
}

export default new IdentityService();

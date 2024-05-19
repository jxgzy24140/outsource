import bcrypt from "bcryptjs";
import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import { CreateUserInputDto, UpdateUserInputDto, UserDto } from "../dtos/user";
import { User } from "../models/user.entity";
import { Like } from "typeorm";
import axios from "axios";
class UserService {
  private readonly userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(input: CreateUserInputDto): Promise<User | null> {
    try {
      const entity = await this.userRepository.findOne({
        where: { email: input.email },
      });
      if (entity) return null;
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(input.password, salt);
      const user = this.userRepository.create(
        mapper.map(input, CreateUserInputDto, User)
      );
      await this.userRepository.save(user);
      await axios.post("http://localhost:8081/api/v1/identity/createAccount", {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      });
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateUser(
    id: number,
    input: UpdateUserInputDto
  ): Promise<UserDto | null> {
    try {
      const user: any = await this.userRepository.findOne({ where: { id } });
      if (!user) return null;
      console.log(id, input, user);

      user.roleId = input.roleId;
      user.email = input.email;
      user.fullName = input.fullName;
      user.updatedDate = new Date(Date());
      if (input.password) {
        const isVerified = await bcrypt.compare(input.password, user.password);
        if (isVerified) {
          const salt = await bcrypt.genSalt(10);
          input.password = await bcrypt.hash(input.password, salt);
          user.password = input.password;
        }
      }

      await this.userRepository.save(user);
      await axios.post("http://localhost:8081/api/v1/identity/updateAccount", {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      });

      return await this.get(id);
    } catch (err: any) {
      console.log("err: ", err);

      throw new Error(err);
    }
  }

  async delete(id: number) {
    try {
      const date = Date();
      const entity = await this.userRepository.findOne({
        where: { id },
      });
      if (!entity) return null;
      entity.isDeleted = true;
      entity.updatedDate = new Date(date);

      await axios.post("http://localhost:8081/api/v1/identity/deleteAccount", {
        userId: entity.id,
      });

      await this.userRepository.save(entity);
      return true;
    } catch {
      return false;
    }
  }

  async get(id: number): Promise<UserDto | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isDeleted: false },
        relations: ["role"],
      });
      if (!user) return null;
      return mapper.map(user, User, UserDto);
    } catch {
      return null;
    }
  }

  async getAll(pageNumber: number, pageSize: number, keyword?: string) {
    try {
      const searchCondition: any = keyword
        ? { fullName: Like(`%${keyword}%`) }
        : {};
      searchCondition.isDeleted = false;
      const users = await this.userRepository.find({
        where: searchCondition,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["role"],
      });
      const total = await this.userRepository.count({ where: searchCondition });
      return {
        items: mapper.mapArray(users, User, UserDto),
        total: total,
        currentPage: pageNumber,
        pageSize: pageSize,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new UserService();

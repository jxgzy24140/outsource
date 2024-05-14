import bcrypt from "bcryptjs";
import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import { CreateUserInputDto, UpdateUserInputDto, UserDto } from "../dtos/user";
import { User } from "../models/user.entity";
class UserService {
  private readonly userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(input: CreateUserInputDto): Promise<User | null> {
    try {
      const existedUser = await this.userRepository.findOne({
        where: { email: input.email },
      });
      if (existedUser) return null;
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(input.password, salt);
      const newUser = this.userRepository.create(input);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateUser(
    id: number,
    input: UpdateUserInputDto
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return null;
      Object.keys(input).forEach((key: any) => {
        // @ts-ignore
        const value = input[key];
        if (value && key !== "password") {
          // @ts-ignore
          user[key] = value;
        }
      });
      await this.userRepository.save(user);
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) return null;
      await this.userRepository.delete(id);
      return user;
    } catch {
      return null;
    }
  }

  async get(id: number): Promise<UserDto | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["role"],
      });
      if (!user) return null;
      return mapper.map(user, User, UserDto);
    } catch {
      return null;
    }
  }

  async getAll(
    pageNumber: number,
    pageSize: number
  ): Promise<UserDto[] | any[]> {
    try {
      const users = await this.userRepository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["role"],
      });
      return users.length ? mapper.mapArray(users, User, UserDto) : [];
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new UserService();

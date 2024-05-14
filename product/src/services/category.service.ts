import { AppDataSource } from "../utils/data-source";
import { Category } from "../models/category.entity";

class CategoryService {
  private repository = AppDataSource.getRepository(Category);
  async createAsync(input: Category): Promise<Category | null> {
    try {
      const newRole = this.repository.create(input);
      await this.repository.save(newRole);
      return newRole;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateAsync(id: number, input: Category): Promise<Category | null> {
    try {
      await this.repository.update(id, input);
      return await this.repository.findOne({
        where: { id },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteAsync(id: number): Promise<Category | null> {
    try {
      const role = await this.repository.findOne({
        where: { id },
      });
      if (!role) return null;
      await this.repository.delete(id);
      return role;
    } catch {
      return null;
    }
  }

  async getAsync(id: number): Promise<Category | null> {
    try {
      return (
        (await this.repository.findOne({
          where: { id },
        })) ?? null
      );
    } catch {
      return null;
    }
  }

  async getAllAsync(
    pageNumber: number,
    pageSize: number
  ): Promise<Category[] | []> {
    try {
      return await this.repository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new CategoryService();

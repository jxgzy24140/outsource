import { AppDataSource } from "../utils/data-source";
import { Category } from "../models/category.entity";

class CategoryService {
  private repository = AppDataSource.getRepository(Category);
  async createAsync(input: Category): Promise<Category | null> {
    try {
      const entity = this.repository.create(input);
      entity.createdDate = new Date();
      entity.isDeleted = false;
      await this.repository.save(entity);
      return entity;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateAsync(id: number, input: Category): Promise<Category | null> {
    try {
      const entity = await this.repository.findOne({ where: { id } });
      if (!entity) return null;

      entity.categoryName = input.categoryName;
      entity.updatedDate = new Date();
      await this.repository.save(entity);
      return entity;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteAsync(id: number) {
    try {
      const entity = await this.repository.findOne({
        where: { id },
      });
      if (!entity) return null;
      entity.isDeleted = true;
      entity.updatedDate = new Date();
      await this.repository.update(id, entity);
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

  async getAllAsync(): Promise<Category[] | []> {
    try {
      return await this.repository.find();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new CategoryService();

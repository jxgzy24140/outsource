import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import {
  CreateProductInputDto,
  UpdateProductInputDto,
  ProductDto,
} from "../dtos/product";
import { Product } from "../models/product.entity";
class ProductService {
  private readonly repository;
  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async createAsync(input: CreateProductInputDto): Promise<ProductDto | null> {
    try {
      const check = await this.repository.findOne({
        where: { productName: input.productName },
      });
      if (check) return null;
      const entity = this.repository.create(
        mapper.map(input, CreateProductInputDto, Product)
      );
      await this.repository.save(entity);
      return mapper.map(entity, Product, ProductDto);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateAsync(
    id: number,
    input: UpdateProductInputDto
  ): Promise<ProductDto | null> {
    try {
      const entity = await this.repository.findOne({ where: { id } });
      if (!entity) return null;

      await this.repository.save(
        mapper.map(input, UpdateProductInputDto, Product)
      );
      return await this.repository.findOne({
        where: { id },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteAsync(id: number): Promise<ProductDto | null> {
    try {
      const entity = await this.repository.findOne({
        where: { id },
      });
      if (!entity) return null;
      await this.repository.delete(id);
      return entity;
    } catch {
      return null;
    }
  }

  async getAsync(id: number): Promise<ProductDto | null> {
    try {
      const entity = await this.repository.findOne({
        where: { id },
        relations: ["category"],
      });
      if (!entity) return null;
      return mapper.map(entity, Product, ProductDto);
    } catch {
      return null;
    }
  }

  async getAllAsync(
    pageNumber: number,
    pageSize: number
  ): Promise<ProductDto[] | any[]> {
    try {
      const entities = await this.repository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["category"],
      });
      return entities.length
        ? mapper.mapArray(entities, Product, ProductDto)
        : [];
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new ProductService();

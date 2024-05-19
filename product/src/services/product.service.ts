import mapper from "../utils/autoMapper";
import { AppDataSource } from "../utils/data-source";
import {
  CreateProductInputDto,
  UpdateProductInputDto,
  ProductDto,
} from "../dtos/product";
import { Product } from "../models/product.entity";
import { Like } from "typeorm";
class ProductService {
  private readonly repository;
  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async createAsync(input: CreateProductInputDto): Promise<ProductDto | null> {
    try {
      const date = Date();
      const check = await this.repository.findOne({
        where: { productName: input.productName },
      });
      if (check) return null;
      const entity = this.repository.create(
        mapper.map(input, CreateProductInputDto, Product)
      );
      entity.createdDate = new Date(date);
      entity.isDeleted = false;
      await this.repository.save(entity);

      const createdEntity = await this.repository.findOne({
        where: { id: entity.id },
        relations: ["category"],
      });

      return mapper.map(createdEntity, Product, ProductDto);
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

      input.updatedDate = new Date();

      await this.repository.save(
        mapper.map(input, UpdateProductInputDto, Product)
      );

      const updatedEntity = await this.repository.findOne({
        where: { id },
        relations: ["category"],
      });

      return mapper.map(updatedEntity, Product, ProductDto);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteAsync(id: number) {
    try {
      const date = Date();
      const entity = await this.repository.findOne({
        where: { id },
      });
      if (!entity) return null;
      entity.isDeleted = true;
      entity.updatedDate = new Date(date);
      await this.repository.update(id, entity);
      return true;
    } catch {
      return false;
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
    pageSize: number,
    typeId?: number,
    keyword?: string
  ) {
    try {
      const searchCondition: any = keyword
        ? { productName: Like(`%${keyword}%`) }
        : {};
      if (typeId && typeId !== undefined) {
        searchCondition.typeId = typeId;
      }
      searchCondition.isDeleted = false;

      const entities = await this.repository.find({
        where: searchCondition,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["category"],
      });
      const total = await this.repository.count({ where: searchCondition });
      return {
        items: mapper.mapArray(entities, Product, ProductDto),
        total: total,
        currentPage: pageNumber,
        pageSize: pageSize,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async createOrderAsync(input: any) {
    for (let i = 0; i < input.length; i++) {
      const entity = await this.repository.findOne({
        where: {
          id: input[i].id,
          price: input[i].price,
          quantity: input[i].quantity,
        },
      });
      if (!entity) return null;
    }
    return true;
  }

  async updateProductAsync(input: any) {
    try {
      for (let i = 0; i < input.length; i++) {
        const { id, quantity } = input[i];
        const entity: any = await this.repository.findOne({
          where: {
            id,
          },
        });
        entity.quantity -= quantity;
        await this.repository.save(entity);
      }
      return true;
    } catch {
      return false;
    }
  }
}

export default new ProductService();

import categoryService from "@/services/category/categoryService";
import type {
  CategoryOutputDto,
  ICreateOrUpdateCategoryInput,
} from "@/services/category/dto";
import { action, makeAutoObservable, observable } from "mobx";
import type IResponseWithPagination from "@/services/responseWithPaginationDto";

class CategoryStore {
  @observable categories!: IResponseWithPagination<CategoryOutputDto>;
  @observable editCategory: ICreateOrUpdateCategoryInput | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async get(id: any) {
    const response = await categoryService.getCategory(id);
    if (response && response.success && response.data) {
      this.editCategory = response.data;
    }
  }

  @action
  async getAll(pageNumber: number, pageSize: number) {
    const response = await categoryService.getCategories(pageNumber, pageSize);
    if (response && response.success && response.data) {
      this.categories = response.data;
    }
  }

  @action
  async create(input: ICreateOrUpdateCategoryInput) {
    const response = await categoryService.createCategory(input);
    if (response) {
      this.editCategory = null;
      this.categories.items.map((category: any) => {
        if (
          response.success &&
          response.data &&
          category.id == response.data.id
        )
          category = response;
        return category;
      });
    }
  }

  @action
  async update(id: any, input: ICreateOrUpdateCategoryInput) {
    const response = await categoryService.updateCategory(id, input);
    if (response) {
      this.categories.items.map((item: any) => {
        if (response.success && response.data && item.id == input.id)
          item = response.data;
        return item;
      });
    }
  }

  @action
  async delete(id: any) {
    const response = await categoryService.deleteCategory(id);
    if (response && response.success && response.data) {
      this.editCategory = null;
      this.categories.items = this.categories.items.map((item) => {
        if (response.data && response.data?.id == item.id) item = response.data;
        return item;
      });
    }
  }

  @action
  async createCategory() {
    this.editCategory = {
      categoryName: "",
    };
  }

  @action
  cleanUp() {
    this.editCategory = null;
  }
}

export default CategoryStore;

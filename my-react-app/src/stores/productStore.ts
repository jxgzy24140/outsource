import { action, makeAutoObservable, observable } from "mobx";
import type {
  ICreateProductInput,
  IUpdateProductInput,
  ProductOutputDto,
} from "@/services/product/dto";
import productService from "@/services/product/productService";
import type IResponseWithPagination from "@/services/responseWithPaginationDto";

class ProductStore {
  @observable products!: IResponseWithPagination<ProductOutputDto>;
  @observable editProduct:
    | ICreateProductInput
    | IUpdateProductInput
    | ProductOutputDto
    | any = null;

  constructor() {
    makeAutoObservable(this);
  }
  @action
  async get(id: number): Promise<any> {
    const response = await productService.getProduct(id);

    if (response.success) {
      this.editProduct = response.data;
    }
  }

  @action
  async getAll(
    pageNumber: number,
    pageSize: number,
    typeId?: number,
    keyword?: string
  ) {
    const response: any = await productService.getProducts(
      pageNumber,
      pageSize,
      typeId,
      keyword
    );

    if (response) {
      this.products = response;
    }
  }

  @action
  async create(input: ICreateProductInput) {
    const response: any = await productService.createProduct(input);
    if (response.success) {
      this.products.items = [...this.products.items, response.data];
      this.products.total = this.products.total + 1;
      return true;
    }
    return false;
  }

  @action
  async update(id: number, input: IUpdateProductInput) {
    const response = await productService.updateProduct(id, input);
    if (response && response.success) {
      this.editProduct = null;
      this.products.items = this.products.items.map((item: any) => {
        if (item.id == input.id) item = response.data;
        return item;
      });
      return true;
    }
    return false;
  }

  @action
  async delete(id: number) {
    const response = await productService.deleteProduct(id);
    if (response && response.success) {
      this.editProduct = null;
      this.products.items = this.products.items.filter(
        (product) => product?.id != id
      );
      this.products.total = this.products.total - 1;
      return true;
    }
    return false;
  }

  @action
  createProduct() {
    this.editProduct = {
      categoryId: 0,
      productName: "",
      image: "",
      price: 0,
      quantity: 0,
      size: 0,
      typeId: 0,
    };
  }
}

export default ProductStore;

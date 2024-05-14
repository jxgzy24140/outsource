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
  @observable homeProducts!: any;

  constructor() {
    makeAutoObservable(this);
  }
  @action
  async get(id: number): Promise<any> {
    const response = await productService.getProduct(id);
    if (response && response.success && response.data) {
      this.editProduct = response.data;
    }
  }

  @action
  async getHomeProducts() {
    const response = await productService.getHomeProducts();
    if (response && response.success && response.data) {
      this.homeProducts = response.data.items[0];
    }
  }

  @action
  async getProductByCatalog(
    categoryName: string,
    pageNumber: number,
    pageSize: number,
    scat?: string,
    min?: string,
    max?: string,
    sort?: string
  ) {
    const response = await productService.getProductCatalog(
      categoryName,
      pageNumber,
      pageSize,
      scat,
      min,
      max,
      sort
    );
    if (response && response.success && response.data) {
      this.products = response.data;
    }
  }

  @action
  async getAll(pageNumber: number, pageSize: number, sortByPrice?: boolean) {
    const response = await productService.getProducts(pageNumber, pageSize);
    if (response && response.success && response.data) {
      this.products = response.data;
    }
  }

  @action
  async create(input: ICreateProductInput) {
    const response = await productService.createProduct(input);
    if (response) {
      this.editProduct = null;
      this.products.items.map((product: any) => {
        if (response.data && product.id == response.data.id) product = response;
        return product;
      });
    }
    return response;
  }

  @action
  async update(id: number, input: IUpdateProductInput) {
    const response = await productService.updateProduct(id, input);
    if (response && response.data) {
      this.editProduct = null;
      this.products.items = this.products.items.map((item: any) => {
        if (item.id == input.id) item = response;
        return item;
      });
      return response;
    }
    return response;
  }

  @action
  async delete(id: number) {
    const response = await productService.deleteProduct(id);
    if (response && response.data) {
      this.editProduct = null;
      this.products.items = this.products.items.map((product: any) => {
        if (product.id != id) return product;
      });
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
      productCode: "",
      description: "",
      image: "",
      price: 0,
      discount: 0,
      quantity: 0,
      inStock: true,
      creationId: 0,
    };
  }
}

export default ProductStore;

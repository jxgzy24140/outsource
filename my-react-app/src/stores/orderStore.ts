import { action, makeAutoObservable, observable } from "mobx";
import type IResponseWithPagination from "@/services/responseWithPaginationDto";
import type {
  ICreateOrUpdateShippingmethodInput,
  ICreateOrderInput,
  IUpdateOrderInput,
  OrderOutputDto,
  ShippingMethodOutputDto,
} from "@/services/order/dto";
import orderService from "@/services/order/orderService";

class OrderStore {
  @observable orders!: IResponseWithPagination<OrderOutputDto>;
  @observable order!: OrderOutputDto;
  @observable editOrder: ICreateOrderInput | OrderOutputDto | null = null;
  @observable editShippingMethod:
    | ICreateOrUpdateShippingmethodInput
    | ShippingMethodOutputDto
    | null = null;
  @observable shoppingCart: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async getOrders(pageNumber: number, pageSize: number) {
    const response: any = await orderService.getOrders(pageNumber, pageSize);
    if (response && response.success) {
      this.orders = response.data;
    }
  }

  @action
  async getOrder(id: any) {
    const response = await orderService.getOrder(id);
    if (response && response.success && response.data) {
      this.order = response.data;
    }
  }

  @action
  async updateOrder(id: number, input: IUpdateOrderInput) {
    const response = await orderService.updateOrder(id, input);
    if (response && response.success && response.data) {
      this.editOrder = null;
      this.orders.items = this.orders?.items.map((item) => {
        if (item.id == input.id && response.data) item = response.data;
        return item;
      });
      return true;
    }
    return false;
  }

  @action
  async deleteOrder(id: any) {
    const response = await orderService.deleteOrder(id);
    if (response) {
      this.editOrder = null;
      this.orders.items.map((item) => {
        return item.id != id;
      });
    }
  }

  @action
  addToCart(input: any) {
    const localCart = localStorage.getItem("userCart");
    const newItem = {
      id: input.id,
      productName: input.productName,
      quantity: 1,
      price: input.price,
      image: input.image,
    };

    if (localCart) {
      let parsedCart = JSON.parse(localCart);

      const existingItem = parsedCart.find((item: any) => item.id === input.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        parsedCart.push(newItem);
      }

      localStorage.setItem("userCart", JSON.stringify(parsedCart));
      this.shoppingCart = parsedCart; // Chỉ cập nhật giá trị mà không tạo mảng mới
    } else {
      localStorage.setItem("userCart", JSON.stringify([newItem]));
      this.shoppingCart = [newItem];
    }
  }

  @action
  editShoppingCart(id: number, quantity?: number, type = "update") {
    switch (type) {
      case "update": {
        this.shoppingCart = this.shoppingCart.map((item) => {
          if (item.id == id && quantity) {
            item.quantity = quantity;
          }
          return item;
        });
        localStorage.setItem("userCart", JSON.stringify(this.shoppingCart));
        return this.shoppingCart;
      }
      case "remove": {
        this.shoppingCart = this.shoppingCart.filter((item) => item.id != id);
        localStorage.setItem("userCart", JSON.stringify(this.shoppingCart));
        return this.shoppingCart;
      }
      default: {
        return;
      }
    }
  }

  getTotalShoppingCart() {
    return this.shoppingCart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
  }

  @action
  async createOrder(input: any) {
    const response = await orderService.createOrder(input);
    if (response && response.success) {
      return true;
    }
    return false;
  }

  @action
  getCart() {
    const localCart = localStorage.getItem("userCart");

    if (localCart) {
      this.shoppingCart = [...JSON.parse(localCart)];
    }
  }
}

export default OrderStore;

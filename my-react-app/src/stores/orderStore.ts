import { action, makeAutoObservable, observable } from "mobx";
import type IResponseWithPagination from "@/services/responseWithPaginationDto";
import type {
  ICreateOrUpdatePaymentMethodInput,
  ICreateOrUpdateShippingmethodInput,
  ICreateOrderInput,
  IUpdateOrderInput,
  OrderOutputDto,
  PaymentMethodOutputDto,
  ShippingMethodOutputDto,
} from "@/services/order/dto";
import orderService from "@/services/order/orderService";
import { appLayouts } from "@/components/Layout/Router/router.config";

class OrderStore {
  @observable orders!: IResponseWithPagination<OrderOutputDto>;
  @observable order!: OrderOutputDto;
  @observable editOrder: ICreateOrderInput | OrderOutputDto | null = null;
  @observable
  shippingMethods!: IResponseWithPagination<ShippingMethodOutputDto>;
  @observable editShippingMethod:
    | ICreateOrUpdateShippingmethodInput
    | ShippingMethodOutputDto
    | null = null;
  @observable paymentMethods!: IResponseWithPagination<PaymentMethodOutputDto>;
  @observable editPaymentMethod:
    | ICreateOrUpdatePaymentMethodInput
    | PaymentMethodOutputDto
    | null = null;
  @observable shoppingCart: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async getOrders(pageNumber: number, pageSize: number) {
    const response = await orderService.getOrders(pageNumber, pageSize);
    if (response && response.success && response.data) {
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
    console.log(response);

    if (response && response.success && response.data) {
      this.editOrder = null;
      this.orders.items = this.orders?.items.map((item) => {
        if (item.id == input.id && response.data) item = response.data;
        return item;
      });
    }
  }

  @action
  async deleteOrder(id: any) {
    const response = await orderService.deleteOrder(id);
    if (response) {
      this.editOrder = null;
      this.orders.items.map((item) => {
        return item.orderId != id;
      });
    }
  }

  @action
  addToCart(input: any) {
    const localCart = localStorage.getItem("cart");
    const newItem = {
      productId: input.productId,
      productCode: input.productCode,
      productName: input.productName,
      quantity: input.quantity,
      price: input.price,
    };

    if (localCart) {
      let parsedCart = JSON.parse(localCart);

      const existingItem = parsedCart.find(
        (item: any) => item.productId === input.productId
      );

      if (existingItem) {
        existingItem.quantity += input.quantity;
      } else {
        parsedCart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(parsedCart));
      this.shoppingCart = [parsedCart];
      return;
    } else {
      localStorage.setItem("cart", JSON.stringify([newItem]));
      this.shoppingCart = [newItem];
    }
  }

  @action
  editShoppingCart(productId: number, quantity?: number, type = "update") {
    switch (type) {
      case "update": {
        this.shoppingCart = this.shoppingCart.map((item) => {
          if (item.productId == productId && quantity) {
            item.quantity = quantity;
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(this.shoppingCart));
        return this.shoppingCart;
      }
      case "remove": {
        this.shoppingCart = this.shoppingCart.filter(
          (item) => item.productId != productId
        );
        localStorage.setItem("cart", JSON.stringify(this.shoppingCart));
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
  async createOrder(input: ICreateOrderInput) {
    const response = await orderService.createOrder(input);
    if (response && response.data) {
      const createdOrder = response.data;
      this.editOrder = response.data;
      if (input.paymentMethodId == 2) {
      } else {
        window.location.href = `/${appLayouts.payment.path}?orderId=${createdOrder.orderId}&amount=${createdOrder.amount}&resultCode=0&type=1`;
      }
    } else this.editOrder = null;
  }

  @action
  getCart() {
    const localCart = localStorage.getItem("cart");

    if (localCart) {
      this.shoppingCart = [...JSON.parse(localCart)];
    }
  }

  // SHIPPING METHOD
  // @action
  // createNewShippingMethod() {
  //   this.editShippingMethod = {
  //     shippingType: "",
  //     available: true,
  //   };
  // }
  // @action
  // async createShippingMethod(input: ICreateOrUpdateShippingmethodInput) {
  //   const response = await orderService.createShippingMethod(input);
  //   if (response) {
  //     this.editShippingMethod = null;
  //   }
  // }

  // @action
  // async getShippingMethod(id: any) {
  //   const response = await orderService.getShippingMethod(id);
  //   if (response) {
  //     this.editShippingMethod = response;
  //   }
  // }

  // @action
  // async updateShippingMethod(input: ICreateOrUpdateShippingmethodInput) {
  //   const response = await orderService.updateShippingMethod(input);
  //   if (response) {
  //     this.editShippingMethod = null;
  //     this.shippingMethods.items.map((item) => {
  //       if (item.id == input.id) item = response;
  //       return item;
  //     });
  //   }
  // }

  @action
  async getShippingMethods() {
    const response = await orderService.getShippingMethods();
    if (response && response.success && response.data) {
      this.shippingMethods = response.data;
    }
  }

  // @action
  // async deleteShippingMethod(id: any) {
  //   const response = await orderService.DeleteShippingMethod(id);
  //   if (response) {
  //     this.editShippingMethod = null;
  //     this.shippingMethods.items.map((item) => item.id != id);
  //   }
  // }

  // PAYMENT METHOD
  // @action
  // async getPaymentMethod(id: any) {
  //   const response = await orderService.GetPaymentMethod(id);
  //   if (response) {
  //     this.editPaymentMethod = response;
  //   }
  // }

  // @action
  // async updatePaymentMethod(input: ICreateOrUpdatePaymentMethodInput) {
  //   const response = await orderService.UpdatePaymentMethod(input);
  //   if (response) {
  //     this.editPaymentMethod = null;
  //     this.paymentMethods.items.map((item) => {
  //       if (item.id == input.id) item = response;
  //       return item;
  //     });
  //   }
  // }

  @action
  async getPaymentMethods() {
    const response = await orderService.getPaymentMethods();
    if (response && response.success && response.data) {
      this.paymentMethods = response.data;
    }
  }

  // @action
  // createNewPaymentMethod() {
  //   this.editPaymentMethod = {
  //     paymentType: "",
  //     available: true,
  //   };
  // }

  // @action
  // async createPaymentMethod(input: ICreateOrUpdatePaymentMethodInput) {
  //   const response = await orderService.CreatePaymentMethod(input);
  //   if (response) {
  //     this.editPaymentMethod = null;
  //   }
  // }

  // @action
  // async deletePaymentMethod(id: any) {
  //   const response = await orderService.DeletePaymentMethod(id);
  //   if (response) {
  //     this.editShippingMethod = null;
  //     this.paymentMethods.items.map((item) => item.id != id);
  //   }
  // }
}

export default OrderStore;

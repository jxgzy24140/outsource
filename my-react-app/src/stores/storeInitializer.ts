import AuthenticationStore from "@/stores/authenticationStore";
import ProductStore from "@/stores/productStore";
import CategoryStore from "@/stores/categoryStore";
import OrderStore from "@/stores/orderStore";
import AccountStore from "@/stores/accountStore";

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    accountStore: new AccountStore(),
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    orderStore: new OrderStore(),
  };
}

import { lazy } from "react";
export const adminLayouts: any = {
  accounts: {
    path: "accounts",
    component: lazy(() => import("@/scenes/Admin/Account")),
  },
  products: {
    path: "products",
    component: lazy(() => import("@/scenes/Admin/Product")),
  },
  orders: {
    path: "orders",
    component: lazy(() => import("@/scenes/Admin/Order")),
  },
};

export const appLayouts: any = {
  home: {
    path: "home",
    component: lazy(() => import("@/scenes/Home")),
  },
  cart: {
    path: "cart",
    component: lazy(() => import("@/scenes/Cart")),
  },
  purchase: {
    path: "purchase",
    component: lazy(() => import("@/scenes/Account/Profile/Order")),
  },
  order: {
    path: "purchase/order/:id",
    component: lazy(() => import("@/scenes/Account/Profile/OrderDetail")),
  },
};

export const authLayouts: any = {
  login: {
    path: "login",
    component: lazy(() => import("@/scenes/Account/Login")),
  },
  register: {
    path: "register",
    component: lazy(() => import("@/scenes/Account/Register")),
  },
  verify: {
    path: "verify",
    component: lazy(() => import("@/scenes/Account/Verify")),
  },
};

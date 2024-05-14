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
  product: {
    path: "products/:id",
    component: lazy(() => import("@/scenes/Admin/Product/Edit")),
  },
};

export const appLayouts: any = {
  home: {
    path: "home",
    component: lazy(() => import("@/scenes/Home")),
  },
  detail: {
    path: "product/:id",
    component: lazy(() => import("@/scenes/Home/Detail")),
  },
  cart: {
    path: "cart",
    component: lazy(() => import("@/scenes/Cart")),
  },
  payment: {
    path: "payment",
    component: lazy(() => import("@/scenes/Payment")),
  },
  search: {
    path: "search",
    component: lazy(() => import("@/scenes/Product/SearchResultPage")),
  },
  purchase: {
    path: "purchase",
    component: lazy(() => import("@/scenes/Account/Profile/Order")),
  },
  order: {
    path: "purchase/order/:id",
    component: lazy(() => import("@/scenes/Account/Profile/OrderDetail")),
  },
  collection: {
    path: "collections/:categoryName",
    component: lazy(() => import("@/scenes/Product/ProductCatalog")),
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

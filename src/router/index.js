// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";

// Layouts
import MainLayout from "@/layout/MainLayout.vue";

// Pages
import Dashboard from "@/pages/Dashboard.vue";
import Sign_in from "@/pages/logingRegister/Sign_in.vue";
import NotFound from "@/pages/NotFound.vue";

// Categories
import CreateCategory from "@/pages/categories/CreateCategory.vue";
import ManageCategory from "@/pages/categories/ManageCategory.vue";
import UpdateCategory from "@/pages/categories/UpdateCategory.vue";

// Customers
import CreateCustomer from "@/pages/customers/CreateCustomer.vue";
import ManageCustomer from "@/pages/customers/ManageCustomer.vue";
import UpdateCustomer from "@/pages/customers/UpdateCustomer.vue";

// Suppliers
import CreateSupplier from "@/pages/suppliers/CreateSupplier.vue";
import ManageSupplier from "@/pages/suppliers/ManageSupplier.vue";
import UpdateSupplier from "@/pages/suppliers/UpdateSupplier.vue";

// Products
import CreateProduct from "@/pages/products/CreateProduct.vue";
import ManageProduct from "@/pages/products/ManageProduct.vue";
import UpdateProduct from "@/pages/products/UpdateProduct.vue";

// Users
import CreateUser from "@/pages/users/CreateUser.vue";
import ManageUser from "@/pages/users/ManageUser.vue";
import UpdateUser from "@/pages/users/UpdateUser.vue";

// Orders
import CreateOrder from "@/pages/orders/CreateOrder.vue";
import ManageOrder from "@/pages/orders/ManageOrder.vue";
import ShowOrder from "@/pages/orders/ShowOrder.vue";
import ManageOrderDetail from "@/pages/orderDetails/ManageOrderDetail.vue";

// Purchases
import CreatePurchase from "@/pages/purchases/CreatePurchase.vue";
import ManagePurchase from "@/pages/purchases/ManagePurchase.vue";
import ShowPurchase from "@/pages/purchases/ShowPurchase.vue";
import ManagePurchaseDetail from "@/pages/purchaseDetail/ManagePurchaseDetail.vue";

// Stocks & Reports
import ManageStock from "@/pages/stocks/ManageStock.vue";
import OrderReport from "@/pages/reports/OrderReport.vue";
import PurchaseReport from "@/pages/reports/PurchaseReport.vue";

const routes = [
  // Public route: Login
  { path: "/login", name: "Login", component: Sign_in, meta: { public: true } },

  // Protected routes inside MainLayout
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: Dashboard },
      { path: "dashboard", component: Dashboard },

      // Categories
      { path: "categories", component: ManageCategory },
      { path: "categories/create", component: CreateCategory },
      { path: "categories/edit/:id", component: UpdateCategory },

      // Customers
      { path: "customers", component: ManageCustomer },
      { path: "customers/create", component: CreateCustomer },
      { path: "customers/edit/:id", component: UpdateCustomer },

      // Suppliers
      { path: "suppliers", component: ManageSupplier },
      { path: "suppliers/create", component: CreateSupplier },
      { path: "suppliers/edit/:id", component: UpdateSupplier },

      // Products
      { path: "products", component: ManageProduct },
      { path: "products/create", component: CreateProduct },
      { path: "products/edit/:id", component: UpdateProduct },

      // Users
      { path: "users", component: ManageUser },
      { path: "users/create", component: CreateUser },
      { path: "users/edit/:id", component: UpdateUser },

      // Orders
      { path: "orders", component: ManageOrder },
      { path: "orders/create", component: CreateOrder },
      { path: "orders/show/:id", component: ShowOrder },

      // Order Details
      { path: "orderDetails", component: ManageOrderDetail },

      // Purchases
      { path: "purchases", component: ManagePurchase },
      { path: "purchases/create", component: CreatePurchase },
      { path: "purchases/show/:id", component: ShowPurchase },

      // Purchase Details
      { path: "purchaseDetails", component: ManagePurchaseDetail },

      // Stocks
      { path: "stocks", component: ManageStock },

      // Reports
      { path: "orderReport", component: OrderReport },
      { path: "purchaseReport", component: PurchaseReport },
    ],
  },

  // 404 Not Found
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

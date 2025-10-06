import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/ItemsPage.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("../pages/ManagePage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default createRouter({ history: createWebHistory(), routes });

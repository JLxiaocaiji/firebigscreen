/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from "/@/router/types";

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: "/main-out",
    name: "MainOut",
    component: () => import("/@/views/demo/main-out/index.vue"),
    meta: {
      title: "MainOut",
      ignoreAuth: true,
    },
  },
  {
    path: "/bigScreen",
    name: "bigScreen",
    component: () => import("/@/views/dashboard/bigScreen/index.vue"),
    redirect: "/bigScreen/homePage",
    meta: {
      title: "大屏",
      ignoreAuth: true,
    },
    children: [
      {
        path: "homePage",
        name: "homePage",
        component: () => import("/@/views/dashboard/bigScreen/homePage/index.vue"),
        meta: {
          title: "首页",
          ignoreAuth: true,
        },
      },
      {
        path: "fireAlarm",
        name: "fireAlarm",
        component: () => import("/@/views/dashboard/bigScreen/fireAlarm/index.vue"),
        meta: {
          title: "火警信息",
          ignoreAuth: true,
        },
      },
    ],
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);

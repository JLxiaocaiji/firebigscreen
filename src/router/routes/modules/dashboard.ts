import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/analysis",
  meta: {
    orderNo: 10,
    icon: "ion:grid-outline",
    title: t("routes.dashboard.dashboard"),
  },
  children: [
    {
      path: "analysis",
      name: "Analysis",
      component: () => import("/@/views/dashboard/Analysis/index.vue"),
      meta: {
        // affix: true,
        title: t("routes.dashboard.analysis"),
      },
    },
    {
      path: "workbench",
      name: "Workbench",
      component: () => import("/@/views/dashboard/workbench/index.vue"),
      meta: {
        title: t("routes.dashboard.workbench"),
      },
    },
    {
      path: "bigScreen",
      name: "BigScreen",
      component: () => import("/@/views/dashboard/bigScreen/index.vue"),
      redirect: "/dashboard/bigScreen/homePage",
      meta: {
        hideChildrenInMenu: false,
        icon: "simple-icons:about-dot-me",
        title: t("routes.dashboard.about"),
      },
      children: [
        {
          path: "homePage",
          name: "HomePage",
          component: () => import("/@/views/dashboard/bigScreen/homePage/index.vue"),
          meta: {
            title: t("routes.dashboard.about"),
            hideMenu: true,
          },
        },
      ],
    },
  ],
};

export default dashboard;

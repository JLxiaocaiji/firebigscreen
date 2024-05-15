import type { App } from "vue";
// import * as DataV from "@dataview/datav-vue3";
import DataVVue3 from "@kjgl77/datav-vue3";

export function setupDataV(app: App) {
  // app.use(DataV, { classNamePrefix: "dv-" });
  app.use(DataVVue3);
}

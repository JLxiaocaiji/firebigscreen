import { defHttp } from "/@/utils/http/axios";

enum Api {
  list = "/fireRecords/fireEventList",
  detail = "/fireRecords/queryById",
  unitList = "/unit/getUnit",
}

/**
 * 大屏火警事件列表
 * @param params
 * @returns
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 火警预警（档案)-通过id查询（任务详情）
 * @param params
 * @returns
 */
export const detail = (params) => defHttp.get({ url: Api.detail, params });

/**
 * 获取所有单位
 * @param params
 * @returns
 */
export const unitList = () => {
  return defHttp.get({ url: Api.unitList }, { isTransformResponse: false });
};

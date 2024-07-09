import { defHttp } from "/@/utils/http/axios";

enum Api {
  list = "/fireRecords/fireEventList",
  detail = "/fireRecords/queryById",
}

/**
 * list
 * @param params
 * @returns
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * detail
 * @param params
 * @returns
 */
export const detail = (params) => defHttp.get({ url: Api.detail, params });

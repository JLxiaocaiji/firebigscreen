import { transformObjToRoute } from '/@/router/helper/routeHelper';
import { defHttp } from "/@/utils/http/axios";

enum Api {
  url = "/ysPlatform/getUrl",
  token = "/ysPlatform/getAccessToken",
}

/**
 * url
 * @param params:单位名称
 */
export const getUrl = (params) => defHttp.get({ url: Api.url, params }, { isTransformResponse: false });

/**
 * token
 * @param params
 */
export const getToken = () => defHttp.post({ url: Api.token }, { isTransformResponse: false });

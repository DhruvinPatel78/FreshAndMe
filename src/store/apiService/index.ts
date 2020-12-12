import axios from "axios";

/**
 * global api service
 */
const getUrl = (endpoint: string) =>
  `http://onlineshoppingapi.nodevertex.com/${endpoint}`;

const getConfigs = (config: Record<string, any>, additionalHeaders = {}) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    ...additionalHeaders
  },
  ...config
});

const request = async (
  method: "get" | "post" | "put",
  endpoint: string,
  params = {},
  payload = {},
  additionalHeaders = {}
) => {
  let request;
  if (method === "post" || method === "put") {
    request = axios[method](
      getUrl(endpoint),
      payload,
      getConfigs({ params }, additionalHeaders)
    );
  } else {
    request = axios.get(
      getUrl(endpoint),
      getConfigs({ params }, additionalHeaders)
    );
  }

  const { data } = await request;

  return data;
};

export const get = (endpoint: string, params = {}) =>
  request("get", endpoint, params);

export const post = (endpoint: string, data = {}, params = {}, headers = {}) =>
  request("post", endpoint, params, data, headers);

export const put = (endpoint: string, data = {}, params = {}) =>
  request("put", endpoint, params, data);

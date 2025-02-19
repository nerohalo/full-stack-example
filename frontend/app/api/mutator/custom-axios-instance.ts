import Axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({ baseURL: "/" });

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then((res) => res.data).catch((err) => {
    if (err.response) {
      const { data, status } = err.response;
      let errorMessage = data?.message || data?.detail || err.response.statusText;
      if (status === 422) {
        errorMessage = data?.detail[0].msg;
      }

      throw new Error(errorMessage);
    }

    throw err;
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

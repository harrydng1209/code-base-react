import type { TLoadingTarget } from '@/models/types/shared.type';
// import type { ElLoading } from 'element-plus';

import { EResponseStatus } from '@/models/enums/auth.enum';
import { EToast } from '@/models/enums/shared.enum';
import { IFailureResponse } from '@/models/interfaces/auth.interface';
import { TSuccessResponse } from '@/models/types/auth.type';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';
import { useLocalStorage } from '@reactuses/core';
import { AxiosError, type AxiosRequestConfig, type AxiosResponse, isAxiosError } from 'axios';

const { DELETE, GET, PATCH, POST, PUT } = constants.shared.HTTP_METHODS;
const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { ERR_500 } = constants.shared.ERROR_CODES;

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type THttpMethods =
  (typeof constants.shared.HTTP_METHODS)[keyof typeof constants.shared.HTTP_METHODS];

const request = async <T = unknown, M = unknown>(
  method: THttpMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  _loadingTarget?: TLoadingTarget,
  toastMessage?: string,
): Promise<IFailureResponse | TSuccessResponse<T, M>> => {
  // let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    // loadingInstance = showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<T, M>> = await httpService[method](
      url,
      data,
      config,
    );
    if (toastMessage) utils.shared.showToast(toastMessage);

    return {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
    } as TSuccessResponse<T, M>;
  } catch (error) {
    let errorMessage = 'An error occurred';
    let errorCode = ERR_500;

    if (isAxiosError<IFailureResponse>(error)) {
      errorMessage = error.response?.data.error.message || errorMessage;
      errorCode = error.response?.data.error.code || errorCode;
    }

    if (toastMessage) utils.shared.showToast(errorMessage, EToast.Error);

    throw {
      error: {
        code: errorCode,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
    } as IFailureResponse;
  } finally {
    // hideLoading(loadingInstance);
  }
};

const http = {
  delete: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(DELETE, url, undefined, config, loadingTarget, toastMessage);
  },

  get: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(GET, url, undefined, config, loadingTarget, toastMessage);
  },

  handleUnauthorizedError: async (error: AxiosError<IFailureResponse>) => {
    const authStore = useAuthStore();
    const isSuccess = await authStore.actions.refreshToken();

    if (isSuccess) {
      const [accessToken] = useLocalStorage(ACCESS_TOKEN, '');
      const originalRequest = error.config as IAxiosRequestConfig;

      if (originalRequest) {
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        if (!originalRequest._retry) {
          originalRequest._retry = true;
          httpService(originalRequest);
        }
      }
    }
  },

  patch: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(PATCH, url, data, config, loadingTarget, toastMessage);
  },

  post: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(POST, url, data, config, loadingTarget, toastMessage);
  },

  put: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(PUT, url, data, config, loadingTarget, toastMessage);
  },
};

export default http;

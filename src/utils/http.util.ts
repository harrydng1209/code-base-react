import type { TLoadingTargets } from '@/models/types/shared.type';

import { EResponseStatus } from '@/models/enums/auth.enum';
import { TFailureResponse, TSuccessResponse } from '@/models/types/auth.type';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';
import { loadingStore } from '@/stores/loading.store';
import {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

const { ERROR_CODES, STORAGE_KEYS } = constants.shared;
const { AUTH } = constants.routePages;

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type THttpMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: THttpMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  const { showToast } = utils.shared;
  const actions = loadingStore.getState().actions;

  try {
    if (loadingTarget) actions.showLoading();

    const response: AxiosResponse<TSuccessResponse<D, M>> = await httpService[
      method
    ](url, data, config);

    if (toastMessage) showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    let errorCode = ERROR_CODES.ERR_500;
    let errorData = null;
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (isAxiosError<TFailureResponse>(error)) {
      errorCode = error.response?.data.error.code || errorCode;
      errorData = error.response?.data.error.data || errorData;
      errorMessage = error.response?.data.error.message || errorMessage;
      statusCode = error.response?.status || statusCode;
    }

    const result: TFailureResponse = {
      error: {
        code: errorCode,
        data: errorData,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
      statusCode,
    };
    return Promise.reject(result);
  } finally {
    actions.hideLoading();
  }
};

const http = {
  delete: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTargets,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      'delete',
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  get: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTargets,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      'get',
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  handleUnauthorizedError: async (error: AxiosError<TFailureResponse>) => {
    const authStore = useAuthStore();
    const isTokenRefreshed = await authStore.actions.refreshToken();

    if (!isTokenRefreshed) {
      authStore.actions.logout();
      window.location.href = AUTH.LOGIN;
      return;
    }

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const originalRequest = error.config as IAxiosRequestConfig;

    if (originalRequest) {
      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        await httpService(originalRequest);
      }
    }
  },

  patch: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTargets,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      'patch',
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  post: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTargets,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      'post',
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  put: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTargets,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      'put',
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },
};

export default http;

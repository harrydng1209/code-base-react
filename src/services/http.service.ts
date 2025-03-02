import { TFailureResponse, TSuccessResponse } from '@/models/types/auth.type';
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import qs from 'qs';

const { STORAGE_KEYS } = constants.shared;

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true }),
});

httpService.interceptors.request.use(
  (config) => {
    const { convertToSnakeCase } = utils.shared;
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (config.data && !(config.data instanceof FormData))
      config.data = convertToSnakeCase(config.data);
    if (config.params) config.params = convertToSnakeCase(config.params);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response: AxiosResponse<TSuccessResponse>) => {
    const { convertToCamelCase } = utils.shared;

    if (response.data) response.data = convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError<TFailureResponse>) => {
    const { handleUnauthorizedError } = utils.http;
    const status = error.response?.status;

    if (status === HttpStatusCode.Unauthorized) handleUnauthorizedError(error);

    return Promise.reject(error);
  },
);

export default httpService;

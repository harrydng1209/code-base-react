import { IFailureResponse } from '@/models/interfaces/shared.interface';
import { useLocalStorage } from '@reactuses/core';
import axios, { AxiosError } from 'axios';
import qs from 'qs';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true })
});

httpService.interceptors.request.use(
  (config) => {
    const [accessToken] = useLocalStorage(constants.shared.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');

    if (config.data && !(config.data instanceof FormData))
      config.data = utils.shared.convertToSnakeCase(config.data);
    if (config.params) config.params = utils.shared.convertToSnakeCase(config.params);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

httpService.interceptors.response.use(
  (response) => {
    if (response.data) response.data = utils.shared.convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorData = error.response?.data as IFailureResponse;

    if (!status) throw new Error(errorData.error.message || 'An unknown error occurred');

    switch (status) {
      case constants.shared.HTTP_RESPONSE_STATUS_CODES.BAD_REQUEST:
        throw new Error(errorData.error.message || 'The request was invalid');

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.UNAUTHORIZED:
        utils.http.handleUnauthorizedError(error);
        throw new Error(errorData.error.message || 'Authentication is required');

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.FORBIDDEN:
        throw new Error(
          errorData.error.message || 'You do not have permission to access this resource'
        );

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.NOT_FOUND:
        throw new Error(errorData.error.message || 'The requested resource was not found');

      default:
        throw new Error(errorData.error.message || 'An unexpected error occurred');
    }
  }
);

export default httpService;

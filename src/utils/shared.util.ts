import type { TDate, TObjectUnknown } from '@/models/types/shared.type';

import { EResponseStatus } from '@/models/enums/auth.enum';
import { EToast } from '@/models/enums/shared.enum';
import { IFailureResponse } from '@/models/interfaces/auth.interface';
import { TSuccessResponse } from '@/models/types/auth.type';
import storeService from '@/services/store.service';
import { notification } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { capitalize } from 'lodash-es';
import qs from 'qs';
import stringTemplate from 'string-template';

dayjs.extend(utc);

const shared = {
  cleanQuery: <T>(query: TObjectUnknown): T => {
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined && value !== ''),
    );
    return cleanedQuery as T;
  },

  convertToCamelCase: <T>(data: TObjectUnknown | TObjectUnknown[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToCamelCase(item)) as T;
    if (data === null || typeof data !== 'object') return data as T;

    const newObject: TObjectUnknown = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        if ((value as TObjectUnknown).constructor === Object || Array.isArray(value)) {
          newObject[newKey] = shared.convertToCamelCase(value as TObjectUnknown);
          return;
        }
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },

  convertToSnakeCase: <T>(data: TObjectUnknown | TObjectUnknown[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToSnakeCase(item)) as T;
    if (!data || typeof data !== 'object') return data as T;

    const newObject: TObjectUnknown = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        newObject[newKey] = shared.convertToSnakeCase(value as TObjectUnknown);
        return;
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },

  formatDateUTC: (date: TDate) => {
    return dayjs(date).utc().toISOString();
  },

  formatQueryString: (baseUrl: string, query: string | string[] | TObjectUnknown): string => {
    if (
      !query ||
      (Array.isArray(query) && query.length === 0) ||
      (typeof query === 'object' && Object.keys(query).length === 0)
    )
      return baseUrl;

    const queryString =
      typeof query === 'string' ? query : qs.stringify(query, { arrayFormat: 'brackets' });
    return `${baseUrl}?${queryString}`;
  },

  formatString: (template: string, values: TObjectUnknown | unknown[]): string => {
    return stringTemplate(template, values);
  },

  isFailureResponse(response: Error | IFailureResponse): response is IFailureResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'status' in response &&
      response.status === EResponseStatus.Failure
    );
  },

  isSuccessResponse<T, M>(
    response: IFailureResponse | TSuccessResponse<T, M>,
  ): response is TSuccessResponse<T, M> {
    return response.status === EResponseStatus.Success;
  },

  showToast: (description: string, type = EToast.Success, message: string = capitalize(type)) => {
    notification[type]({
      description,
      duration: 3,
      message,
    });
  },

  sleep: (second: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * second);
    });
  },

  storeResetAll: () => {
    storeService.resetAll();
  },
};

export default shared;

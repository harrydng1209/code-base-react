import { TStorageKeys } from '@/models/types/auth.type';

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const getLocalStorage = <T>(
  key: TStorageKeys,
  defaultValue: null | T = null,
): null | T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

export const removeLocalStorage = (key: TStorageKeys): void => {
  localStorage.removeItem(key);
};

export const setLocalStorage = <T>(key: TStorageKeys, value: T): void => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

import { postCountListAndSkip } from "../utils/constants";

export const lsRead = <T>(key: string): undefined | T => {
  let jsonData = localStorage.getItem(key);

  if (!jsonData) return;

  return JSON.parse(jsonData) as T;
};

export const lsWrite = (key: string, data: any): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const stWrite = (key: string, value: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const incrementCountSkip = () => {
  let jsonData = window.sessionStorage.getItem("socme-post-skip-count") || "0";

  let skipCount = JSON.parse(jsonData) as number;

  skipCount += postCountListAndSkip;

  stWrite("socme-post-skip-count", skipCount);
};

export const stRead = <T>(key: string, defaultValue?: T): T | undefined => {
  let jsonData = window.sessionStorage.getItem(key);

  if (!jsonData) return defaultValue;

  return JSON.parse(jsonData) as T;
};

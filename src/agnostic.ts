import {
  NavigateFunction,
  Location,
  NavigateOptions,
  Path,
} from "react-router-dom-v6";
import { UrlSearchParamsHelper } from "./urlSearchParamsHelper";
import { History, CustomHistoryPath, HistoryResponse } from "./historyTypes";
import { V6Response } from "./V6Types";

function mapObjectToKeyValue(obj: any) {
  return Object.entries(obj).map((item) => {
    const [key, value] = item;
    return {
      key: key,
      value: value as string,
    };
  });
}

function getV6Params(method: NavigateFunction, location: Location) {
  const paramsObj = UrlSearchParamsHelper.create(
    (location as Location).search
  ).allParams;

  const push = (
    to: string | CustomHistoryPath,
    navigateOptions: NavigateOptions
  ) => {
    if (typeof to === "string" || typeof to.search === "string") {
      method(to as string | Partial<Path>, navigateOptions);
      return;
    }

    const values = mapObjectToKeyValue(
      typeof to.search === "function"
        ? to.search(paramsObj) || {}
        : to.search || {}
    );

    const path = UrlSearchParamsHelper.create(
      to.clearPreviousParams ? "" : (location as Location).search
    )
      .addOrReplaceParamList(values || [])
      .removeParamList(to.removeParams || []).urlSearchParamsString;

    method({ ...to, search: path }, navigateOptions);
  };

  return {
    push,
    paramsObj,
    location: location,
    navigate: method,
  } as V6Response;
}

function getHistoryParams(method: History) {
  const paramsObj = UrlSearchParamsHelper.create(
    method.location.search
  ).allParams;

  const push = (to: string | CustomHistoryPath, state: unknown) => {
    if (typeof to === "string") {
      method.push(to, state);
      return;
    }

    if (typeof to.search === "string") {
      method.push(to as Partial<Path>, state);
      return;
    }

    const values = mapObjectToKeyValue(
      typeof to.search === "function"
        ? to.search(paramsObj) || {}
        : to.search || {}
    );

    const path = UrlSearchParamsHelper.create(
      to.clearPreviousParams ? "" : method.location.search
    )
      .addOrReplaceParamList(values)
      .removeParamList(to.removeParams || []).urlSearchParamsString;

    method.push({ ...to, search: path }, state);
  };
  return { push, paramsObj, history: method } as HistoryResponse;
}

export function wrapper<TParams extends string | undefined = undefined>(
  method: NavigateFunction,
  location: Location
): V6Response<TParams>;
export function wrapper<TParams extends { params?: string; state?: unknown }>(
  method: History
): HistoryResponse<TParams>;
export function wrapper<TNavigate extends History | NavigateFunction>(
  method: TNavigate,
  location?: Location
) {
  if (typeof method === "function") {
    return getV6Params(method, location as Location);
  }

  return getHistoryParams(method);
}

import {
  NavigateFunction,
  Location,
  NavigateOptions,
  Path,
} from "react-router-dom-v6";
import { RouterProps } from "react-router-dom";
import { UrlSearchParamsHelper } from "./urlSearchParamsHelper";

type CustomPath<TParams extends string | undefined = undefined> = Partial<
  Omit<Path, "search"> & {
    search:
      | string
      | Record<string, string>
      | ((
          props: Record<TParams extends string ? TParams : string, string>
        ) => Record<string, string>);
    clearPrevousParams: boolean;
    removeParams: string[];
  }
>;

type History = RouterProps["history"];

interface V6Response<TParams extends string | undefined = undefined> {
  push(to: CustomPath<TParams>, navigateOptions?: NavigateOptions): void;
  push(to: string, navigateOptions?: NavigateOptions): void;
  paramsObj: Record<TParams extends string ? TParams : string, string>;
}

interface HistoryResponse<
  TParams extends string | undefined = undefined,
  TState = unknown
> {
  push(to: CustomPath<TParams>, state?: TState): void;
  push(to: string, state?: TState): void;
  paramsObj: Record<TParams extends string ? TParams : string, string>;
}

function mapObjectToKeyValue(obj: any) {
  return Object.entries(obj).map((item) => {
    const [key, value] = item;
    return {
      key: key,
      value: value as string,
    };
  });
}

export function wrapper<TParams extends string | undefined = undefined>(
  method: NavigateFunction,
  location: Location
): V6Response<TParams>;
export function wrapper<
  TParams extends string | undefined = undefined,
  TState = unknown
>(method: History): HistoryResponse<TParams, TState>;
export function wrapper<TNavigate extends History | NavigateFunction>(
  method: TNavigate,
  location?: Location
) {
  if (typeof method === "function") {
    const paramsObj = UrlSearchParamsHelper.create(
      (location as Location).search
    ).allParams;

    const push = (
      to: string | CustomPath,
      navigateOptions: NavigateOptions
    ) => {
      if (typeof to === "string") {
        method(to, navigateOptions);
        return;
      }

      if (typeof to.search === "string") {
        method(to as Partial<Path>, navigateOptions);
        return;
      }

      const values = mapObjectToKeyValue(
        typeof to.search === "function"
          ? to.search(paramsObj) || {}
          : to.search || {}
      );

      const path = UrlSearchParamsHelper.create(
        to.clearPrevousParams ? "" : (location as Location).search
      )
        .addOrReplaceParamList(values || [])
        .removeParamList(to.removeParams || []).urlSearchParamsString;

      method({ ...to, search: path }, navigateOptions);
    };

    return {
      push,
      paramsObj,
    } as V6Response;
  }

  const paramsObj = UrlSearchParamsHelper.create(
    method.location.search
  ).allParams;

  const push = (to: string | CustomPath, state: unknown) => {
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
      to.clearPrevousParams ? "" : method.location.search
    )
      .addOrReplaceParamList(values)
      .removeParamList(to.removeParams || []).urlSearchParamsString;

    method.push({ ...to, search: path }, state);
  };

  return { push, paramsObj } as HistoryResponse;
}

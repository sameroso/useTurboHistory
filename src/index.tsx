import { useCallback, useMemo } from "react";
import {
  NavigatePropsType,
  NavigateAdditionaPropsType,
  Search,
  NavigateParamsType,
} from "./types";
import { useNavigate as useRRDNavigate, useLocation } from "react-router-dom";
import { UrlSearchParamsHelper } from "./urlSearchParamsHelper";

function useNavigate<T extends string | undefined = undefined>() {
  const location = useLocation();
  const RRDNavigate = useRRDNavigate();

  const helpers = UrlSearchParamsHelper.create(location.search);

  const searchOj = useMemo(
    () => helpers.allParams,
    [location.search]
  ) as Record<T extends string ? T : string, string>;

  const navigate = useCallback(
    <K extends Search<T>>(
      params: NavigatePropsType<K, T>,
      params2?: NavigateAdditionaPropsType
    ) => {
      let navigateParams: NavigateParamsType<K, T>;

      if (typeof params === "string") {
        navigateParams = params;
      } else {
        let parsedParams: string | Record<string, string>;

        if (typeof params.search === "string") {
          parsedParams = params.search;

          parsedParams = UrlSearchParamsHelper.create()
            .removeParamList(params?.removeParams || [])
            .addOrReplaceParamList(
              params?.replaceParams || []
            ).urlSearchParamsString;
        } else {
          const values = Object.entries(
            typeof params?.search === "function"
              ? params.search(searchOj)
              : params.search || {}
          ).map((item) => {
            const [key, value] = item;
            return {
              key: key,
              value: value || "",
            };
          });

          parsedParams = UrlSearchParamsHelper.create()
            .addOrReplaceParamList(values)
            .removeParamList(params?.removeParams || [])
            .addOrReplaceParamList(
              params?.replaceParams || []
            ).urlSearchParamsString;
        }

        navigateParams = {
          search: parsedParams,
          pathname: params?.pathname,
          hash: params?.hash,
        };
      }

      RRDNavigate(navigateParams, params2);
    },
    []
  );

  return {
    navigate,
    searchOj,
    searchString: location.search,
    pathname: location.pathname,
  };
}

export default useNavigate;

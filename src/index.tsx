import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UrlSearchParamsHelper } from "./urlSearchParamsHelper";

interface Props<T extends string> {
  pathname?: string;
  hash?: string;
  search?: T | Record<T, string>;
  replace?: boolean;
  state?: any;
  removeParams: T[];
  replaceParams: { key: T; value: string }[];
}

function useNav<T extends string>() {
  const location = useLocation();
  const _navigate = useNavigate();

  const helpers = UrlSearchParamsHelper.create(location.search);

  const searchOj = useMemo(
    () => helpers.allParams,
    [location.search]
  ) as Record<T, string>;

  const navigate = useCallback((params?: Props<T>) => {
    const values = Object.entries(params?.search || {}).map((item) => {
      const [key, value] = item;
      return {
        key,
        value,
      };
    });

    const parsedParams = UrlSearchParamsHelper.create()
      .addOrReplaceParamList(values)
      .removeParamList(params?.removeParams || [])
      .addOrReplaceParamList(params?.replaceParams || []).urlSearchParamsString;

    _navigate(
      {
        pathname: params?.pathname || location.pathname,
        hash: params?.hash,
        search:
          typeof params?.search === "string" ? params.search : parsedParams,
      },
      {
        state: params?.state,
        replace: params?.replace,
      }
    );
  }, []);

  return {
    navigate,
    searchOj,
    searchString: location.search,
    pathname: location.pathname,
  };
}

export default useNav;

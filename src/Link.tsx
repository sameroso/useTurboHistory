import React from "react";
import { UrlSearchParamsHelper } from "./urlSearchParamsHelper";
import {
  Link as RRDLink,
  LinkProps,
} from "react-router-dom";


interface ToProps<T extends string | Record<string, string>> {
    search?: T;
    removeParams?: T extends string ? string[] : (keyof T)[];
    replaceParams?: { key: T extends string ? string : keyof T; value: string }[];
    pathname?: string;
    hash?: string;
  }
  
  interface CustomLinkProps<
    T extends string | ToProps<K>,
    K extends string | Record<string, string>
  > {
    to: T extends string ? string : ToProps<K>;
  }
  
  export const Linkster = <
    T extends string | ToProps<K>,
    K extends string | Record<string, string>
  >(
    props: Omit<LinkProps, "to"> & CustomLinkProps<T, K>
  ) => {
    let formattedTo:
      | string
      | (Omit<ToProps<K>, "removeParams" | "replaceParams" | "search"> & {
          search: string;
        });
  
    if (typeof props.to === "string") {
      formattedTo = props.to;
    } else {
      const values = Object.entries(props?.to?.search || {}).map((item) => {
        const [key, value] = item;
        return {
          key,
          value,
        };
      });
  
      const parsedParams = UrlSearchParamsHelper.create()
        .addOrReplaceParamList(values || [])
        .addOrReplaceParamList(props?.to?.replaceParams || [])
        .removeParamList(props?.to?.removeParams || []).urlSearchParamsString;
  
      formattedTo = {
        hash: props?.to?.hash,
        pathname: props?.to?.pathname,
        search: parsedParams,
      };
    }
  
    return (
      <RRDLink {...props} to={formattedTo}>
        asd
      </RRDLink>
    );
  };
  
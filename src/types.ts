export type GenericFunction = (...args: any) => any;

export interface NavigateAdditionaPropsType {
  replace?: boolean;
  state?: any;
}

export type Search<T> =
  | T
  | string
  | Record<string, string>
  | ((
      props: Partial<Record<T extends string ? T : string, string>>
    ) => Record<string, string>);

export type NavigateParamsType<
  K extends Search<T>,
  T extends string | undefined = undefined
> =
  | string
  | (Omit<
      NavigatePropsType<K, T>,
      "replaceParams" | "removeParams" | "search"
    > & {
      search?: string;
    });

export interface NavigatePropsType<
  K extends Search<T>,
  T extends string | undefined = undefined
> {
  pathname?: string;
  hash?: string;
  search?: K;

  removeParams?: K extends GenericFunction
    ? (keyof ReturnType<K> | T)[]
    : K extends Record<string, string>
    ? (keyof K | T)[]
    : (T extends string ? T : string)[];

  replaceParams?: {
    key: K extends string
      ? string
      : K extends GenericFunction
      ? T | keyof ReturnType<K>
      : keyof K | T;
    value: string;
  }[];
}

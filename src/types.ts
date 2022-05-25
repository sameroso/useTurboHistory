export type GenericFunction = (...args: any) => any;

export interface NavigateAdditionaPropsType {
  replace?: boolean;
  state?: any;
}

export type Search<T> =
  | string
  | Record<string, string>
  | ((
      props: Partial<Record<T extends string ? T : string, string>>
    ) => Record<string, string | undefined>);

export type NavigateParamsType<K, T extends string | undefined = undefined> =
  | string
  | (Omit<
      NavigatePropsType<K, T>,
      "replaceParams" | "removeParams" | "search"
    > & {
      search?: string;
    });

export interface NavigatePropsType<
  K extends string | GenericFunction | Partial<Record<string, string>>,
  T extends string | undefined = undefined
> {
  pathname?: string;
  hash?: string;
  search?: K extends string
    ? string
    : T extends string
    ? Record<T, string> | K
    : K;

  removeParams?: K extends string
    ? string[]
    : K extends GenericFunction
    ? (T | keyof ReturnType<K>)[]
    : (keyof K | T)[];

  replaceParams?: {
    key: K extends string
      ? string
      : K extends GenericFunction
      ? T | keyof ReturnType<K>
      : keyof K | T;
    value: string;
  }[];
}

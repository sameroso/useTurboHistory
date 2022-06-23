export type CustomPath<TParams extends string | undefined = undefined> = {
  search?:
    | string
    | Record<string, string>
    | ((
        props: Record<TParams extends string ? TParams : string, string>
      ) => Record<string, string>);
  clearPreviousParams?: boolean;
  removeParams?: string[];
};

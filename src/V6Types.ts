import {
  NavigateFunction,
  Location,
  NavigateOptions,
  Path,
} from "react-router-dom-v6";
import { CustomPath } from "./sharedTypes";

type CustomV6Path<TParams extends string | undefined = undefined> = Omit<Path,"search">& CustomPath<TParams>

export interface V6Response<TParams extends string | undefined = undefined> {
  push(to: CustomV6Path<TParams>, navigateOptions?: NavigateOptions): void;
  push(to: string, navigateOptions?: NavigateOptions): void;
  paramsObj: Record<TParams extends string ? TParams : string, string>;
  navigate: NavigateFunction;
  location: Location;
}

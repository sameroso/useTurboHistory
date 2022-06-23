import { CustomPath } from "./sharedTypes";
///////////////////
// History Library Types
///////////
export type Action = "PUSH" | "POP" | "REPLACE";
export type UnregisterCallback = () => void;

export interface History<HistoryLocationState = LocationState> {
  length: number;
  action: Action;
  location: Location<HistoryLocationState>;
  push(
    location: Path | LocationDescriptor<HistoryLocationState>,
    state?: HistoryLocationState
  ): void;
  replace(
    location: Path | LocationDescriptor<HistoryLocationState>,
    state?: HistoryLocationState
  ): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(
    prompt?: boolean | string | TransitionPromptHook<HistoryLocationState>
  ): UnregisterCallback;
  listen(listener: LocationListener<HistoryLocationState>): UnregisterCallback;
  createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}

export interface Location<S = LocationState> {
  pathname: Pathname;
  search: Search;
  state: S;
  hash: Hash;
  key?: LocationKey | undefined;
}

export interface LocationDescriptorObject<S = LocationState> {
  pathname?: Pathname | undefined;
  search?: Search | undefined;
  state?: S | undefined;
  hash?: Hash | undefined;
  key?: LocationKey | undefined;
}

export namespace History {
  export type LocationDescriptor<S = LocationState> =
    | Path
    | LocationDescriptorObject<S>;
  export type LocationKey = string;
  export type LocationListener<S = LocationState> = (
    location: Location<S>,
    action: Action
  ) => void;

  export type LocationState = unknown;
  export type Path = string;
  export type Pathname = string;
  export type Search = string;
  export type TransitionHook<S = LocationState> = (
    location: Location<S>,
    callback: (result: any) => void
  ) => any;
  export type TransitionPromptHook<S = LocationState> = (
    location: Location<S>,
    action: Action
  ) => string | false | void;
  export type Hash = string;
  export type Href = string;
}

export type LocationDescriptor<S = LocationState> =
  History.LocationDescriptor<S>;
export type LocationKey = History.LocationKey;
export type LocationListener<S = LocationState> = History.LocationListener<S>;
export type LocationState = History.LocationState;
export type Path = History.Path;
export type Pathname = History.Pathname;
export type Search = History.Search;
export type TransitionHook<S = LocationState> = History.TransitionHook<S>;
export type TransitionPromptHook<S = LocationState> =
  History.TransitionPromptHook<S>;
export type Hash = History.Hash;
export type Href = History.Href;

//////////////////
///  History Custom types
/////////////////

export interface HistoryResponse<
  TParams extends { params?: string; state?: unknown } = {
    params: undefined;
    state: unknown;
  }
> {
  push(
    to: CustomHistoryPath<TParams["params"], TParams["state"]>,
    state?: TParams["state"]
  ): void;
  push(to: string, state?: TParams["state"]): void;
  paramsObj: Record<
    TParams["params"] extends string ? TParams["params"] : string,
    string
  >;
  history: History<TParams["state"]>;
}

export type CustomHistoryPath<
  TParams extends string | undefined = undefined,
  TState extends string | unknown = unknown
> = Omit<LocationDescriptorObject<TState>, "search"> & CustomPath<TParams>;

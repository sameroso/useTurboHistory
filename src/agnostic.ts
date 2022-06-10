export type Pathname = string;
export type Search = string;
export type Hash = string;
export type Key = string;

export interface Path {
  pathname: Pathname;
  search: Search;
  hash: Hash;
}

type To = string | Partial<Path>;

export interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

interface NavigateFunction {
  (to: To, options: NavigateOptions): void;
  (delta: number): void;
}

////////////////////// History V5

export interface LocationDescriptorObject<S = LocationState> {
  pathname?: Pathname;
  search?: Search;
  state?: S;
  hash?: Hash;
  key?: LocationKey;
}

export type Action = "PUSH" | "POP" | "REPLACE";
export type LocationState = unknown;
export type LocationKey = string;
export type LocationDescriptor<S = LocationState> =
  | string
  | LocationDescriptorObject<S>;
export type UnregisterCallback = () => void;
export type Href = string;
export type TransitionPromptHook<S = LocationState> = (
  location: Location<S>,
  action: Action
) => string | false | void;
export type LocationListener<S = LocationState> = (
  location: Location<S>,
  action: Action
) => void;

export interface Location<S = LocationState> {
  pathname: Pathname;
  search: Search;
  state: S;
  hash: Hash;
  key?: LocationKey;
}

export interface History<HistoryLocationState = LocationState> {
  length: number;
  action: Action;
  location: Location<HistoryLocationState>;
  push(path: string, state?: HistoryLocationState): void;
  push(location: LocationDescriptor<HistoryLocationState>): void;
  replace(path: string, state?: HistoryLocationState): void;
  replace(location: LocationDescriptor<HistoryLocationState>): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(
    prompt?: boolean | string | TransitionPromptHook<HistoryLocationState>
  ): UnregisterCallback;
  listen(listener: LocationListener<HistoryLocationState>): UnregisterCallback;
  createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}

export const wrapper =
  <TNavigate extends History | NavigateFunction>(method: TNavigate) =>
  (
    path: TNavigate extends History
      ? string | LocationDescriptor
      : string | Path,
    options: TNavigate extends NavigateFunction ? NavigateOptions : never
  ) => {
    if (typeof method === "function") {
      method(path, options);
    } else {
      return { push: method.push };
    }
  };

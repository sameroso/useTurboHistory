import React from "react";
import { createRoot } from "react-dom/client";
import useNav from "../../src/index";
import { Linkster } from "../../src/Link";

import { useHistory, BrowserRouter, Route } from "react-router-dom";

import { wrapper } from "../../src/agnostic";

const useTurboHistory = <
  TParams extends { state?: unknown; params?: string } = {
    state?: unknown;
    params?: string;
  }
>() => {
  const history = useHistory();
  const stetroidsHistory = wrapper<TParams>(history);

  return stetroidsHistory;
};

const App = () => {
  const { push, paramsObj,history } = useTurboHistory<{ params: "samin"; state: "manoel" }>();
  console.log(paramsObj.samin);
  history

  return (
    <>
      <button
        onClick={() =>
          push(
            {
              search: (props) => ({ dsa: props.samin }),
              clearPreviousParams: true,
              removeParams: [""],
              pathname: "",
              hash: "",
              state: "manoel",
            },
            "manoel"
          )
        }
      >
        samer
      </button>
    </>
  );
};

const container = document.querySelector("#root") as Element;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
);

import React from "react";
import { createRoot } from "react-dom/client";
import useNav from "../src/index";
import { Linkster } from "../src/Link";

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useNavigate,
//   useLocation,
//   useSearchParams,
// } from "react-router-dom-v6";

import { useHistory, BrowserRouter, Route } from "react-router-dom";

import { wrapper } from "../src/agnostic";

const useX = () => {
  const history = useHistory();
  // console.log(useHistory)
  // const navigate = useNavigate();
  // const location = useLocation();

  const stetroidsHistory = wrapper<"samin">(history);

  return stetroidsHistory;
};

const App = () => {
  // const { navigate, searchOj, searchString, pathname } = useNav();
  const { push, paramsObj } = useX();
  console.log(paramsObj.samin);

  return (
    <>
      <button
        onClick={() => push({ search: (props) => ({ dsa: props.samin }) }, {})}
      >
        samer
      </button>
    </>
  );
};

const App2 = () => {
  const { navigate, searchOj, searchString, pathname } = useNav<"kayali">();

  return (
    <>
      <button
        onClick={() =>
          navigate(
            {
              search: "kayali=jamaica",
              removeParams: ["kayali"],
              replaceParams: [{ key: "ololo", value: "charmander" }],
            },
            { replace: true }
          )
        }
      >
        samer
      </button>
      <Linkster
        to={{
          search: { samer: "kayali", log: "hehe" },
          removeParams: ["log"],
          replaceParams: [{ key: "log", value: "jones" }],
        }}
      >
        samer
      </Linkster>
    </>
  );
};

const container = document.querySelector("#root") as Element;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Route path="/" component={App} />
    <Route path="/2" component={App2} />
  </BrowserRouter>
);

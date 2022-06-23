import React from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom-v6";

import { wrapper } from "../../src/agnostic";

const useX = <TParams extends string | undefined = undefined>() => {
  const navigate = useNavigate();
  const location = useLocation();

  const stetroidsHistory = wrapper<TParams>(navigate, location);

  return stetroidsHistory;
};

const App = () => {
  // const { navigate, searchOj, searchString, pathname } = useNav();
  const { push, paramsObj } = useX<"samin">();

  return (
    <>
      <button
        onClick={() =>
          push({
            search: (props) => ({ dsa: props.samin }),
            clearPreviousParams: true,
            removeParams: [""],
            pathname: "",
            hash: "",
          })
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
    <Route path="/" element={<App />} />
  </BrowserRouter>
);

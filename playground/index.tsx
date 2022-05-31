import React from "react";
import { createRoot } from "react-dom/client";
import useNav from "../src/index";
import { Linkster } from "../src/Link";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { navigate, searchOj, searchString, pathname } = useNav();

  console.log(searchOj);

  return (
    <>
      <button
        onClick={() =>
          navigate({
            replaceParams: [{ key: "samer", value: "charmander" }],
          })
        }
      >
        samer
      </button>
      <Linkster
        to={{
          search: { samer: "kayali", log: "hehe" },
          replaceParams: [{ key: "log", value: "jones" }],
        }}
      >
        samer
      </Linkster>
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
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/2" element={<App2 />} />
    </Routes>
  </BrowserRouter>
);

import React from "react";
import { createRoot } from "react-dom/client";
import useNav from "../src/index";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { navigate, searchOj, searchString, pathname } = useNav<
    "samer" | "yellow"
  >();

  return (
    <button
      onClick={() =>
        navigate({
          search: searchOj,
          pathname: pathname,
          removeParams: ["samer"],
          replaceParams: [{ key: "samer", value: "kayali" }],
        })
      }
    >
      samer
    </button>
  );
};

const App2 = () => {
  console.log("olaaa");
  return <div>ssssss</div>;
};

const container = document.querySelector("#root") as Element;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/1" element={<App />} />
      <Route path="/2" element={<App2 />} />
    </Routes>
  </BrowserRouter>
);

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/homepage";
import RouteSearch from "../src/pages/RouteSearch";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes" element={<RouteSearch />} />
        <Route
          path="*"
          element={
            <main
              style={{
                padding: "1rem",
                color: "#F45815",
                fontSize: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
              }}
            >
              <p>Something went wrong. There is nothing to display here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import LandingLayout from "./layouts/Landing";

import Starting from "./pages/voters/starting/Starting";
import MobileValidation from "./pages/voters/validation/MobileValidation";
import VotingStage from "./pages/voters/votingstage/VotingStage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          {/* <Route index element={<Welcome />} /> */}
          <Route path="starting" element={<Starting />} />
          <Route path="validate_code" element={<MobileValidation />} />
          <Route path="vote" element={<VotingStage />} />
        </Route>
      </Routes>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import LandingLayout from "./layouts/Landing";
import GuestGuard from "./components/guards/GuestGuard";
import Starting from "./pages/voters/starting/Starting";
import MobileValidation from "./pages/voters/validation/MobileValidation";
import VotingStage from "./pages/voters/votingstage/VotingStage";
import ThankYou from "./pages/voters/thankyou/ThankYou";
import ConfirmationPage from "./pages/voters/confirmation/ConfirmationPage";
import Voted from "./pages/voters/voted/Voted";
import IndividualNominationForm from "./pages/voters/nominations/individual/IndividualNominationForm";
import OrganizationNominationForm from "./pages/voters/nominations/organization/OrganizationNominationForm";
import NominationThankYou from "./pages/voters/nominations/NominationThankYou";
import HomePage from "./pages/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("Initializing here at index");
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingLayout>
              <HomePage />
            </LandingLayout>
          }
        />
        {/* <Route index element={<Welcome />} /> */}
        <Route path="starting" element={<Starting />} />
        <Route path="validate_code" element={<MobileValidation />} />
        <Route
          path="vote"
          element={
            <GuestGuard>
              <VotingStage />
            </GuestGuard>
          }
        />
        <Route
          path="confirm"
          element={
            <GuestGuard>
              <ConfirmationPage />
            </GuestGuard>
          }
        />
        <Route
          path="thank-you"
          element={
            <GuestGuard>
              <ThankYou />
            </GuestGuard>
          }
        />
        <Route
          path="individual-nomination-form"
          element={<IndividualNominationForm />}
        />
        <Route
          path="organization-nomination-form"
          element={<OrganizationNominationForm />}
        />
        <Route path="thank-you-nomination" element={<NominationThankYou />} />
        <Route path="voted" element={<Voted />} />
      </Routes>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

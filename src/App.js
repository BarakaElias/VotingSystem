import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";
import "./i18n";
import routes from "./routes";

import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LayoutProvider } from "./contexts/LayoutContext";
import ChartJsDefaults from "./utils/ChartJsDefaults";
import { AuthProvider } from "./contexts/JWTContext";
import { AwardCycleProvider } from "./contexts/AwardCycleContext";

// import { AuthProvider } from "./contexts/JWTContext";

function App() {
  const content = useRoutes(routes);
  console.log("Initializing here at app");

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Voting System" defaultTitle="Afya Awards" />
      <Provider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <AuthProvider>
                <AwardCycleProvider>{content}</AwardCycleProvider>
              </AuthProvider>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;

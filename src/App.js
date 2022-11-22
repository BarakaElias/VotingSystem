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

// import { AuthProvider } from "./contexts/JWTContext";

function App() {
  const content = useRoutes(routes);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Voting System" defaultTitle="Afya Awards" />
      <Provider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <ChartJsDefaults />
              <AuthProvider>{content}</AuthProvider>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;

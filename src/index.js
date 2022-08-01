import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <MoralisProvider
      initializeOnMount
      appId={"GurlOI15zJXgvMlcuoglYJFEF1Ud2ZV0EVB3zpHk"}
      serverUrl={"https://lomvz2ou25ro.usemoralis.com:2053/server"}
    >
      <NotificationProvider>
        <Router>
          <App />
        </Router>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>
);



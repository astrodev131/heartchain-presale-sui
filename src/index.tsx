import React from "react";
import ReactDOM from "react-dom/client";
import { WalletKitProvider } from "@mysten/wallet-kit";

import "./assets/style/index.scss";
import "./assets/style/global.scss";
import { Router } from "./router";
// import configureStore from './store'
// import { dataConst } from './store/constants/dataConst';
import reportWebVitals from "./reportWebVitals";

import StakingProvider from "./context";

// const InitialData = { data: dataConst }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StakingProvider>
      <WalletKitProvider>
        <Router />
      </WalletKitProvider>
    </StakingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(false);

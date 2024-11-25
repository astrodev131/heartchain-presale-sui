import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ReferralPage } from "./pages/referral";
import { Layout } from "./components/layouts/layout";
import { AirdropPage } from "./pages/airdrop";
import { ComingsoonPage } from "./pages/comingsoon";
import HomePage from "./pages/home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/airdrop" element={<ComingsoonPage />} />
          <Route path="/doc" element={<ComingsoonPage />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

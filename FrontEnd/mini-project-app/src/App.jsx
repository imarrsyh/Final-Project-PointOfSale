import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./pages/LandingPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;

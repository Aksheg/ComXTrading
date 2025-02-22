import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import { RegistrationProvider } from "./context/RegistrationContext";
import { LoginProvider } from "./context/LoginContext";
import RegistrationRoutes from "./routes.tsx/RegistrationRoutes";
import LoginRoutes from "./routes.tsx/LoginRoutes";
import TradingInterface from "./components/TradingInterface";

const App: React.FC = () => {
  return (
    <RegistrationProvider>
      <LoginProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register/*" element={<RegistrationRoutes />} />
            <Route path="/sign-in/*" element={<LoginRoutes />} />
            <Route path="/dashboard" element={<TradingInterface />} />
          </Routes>
        </Router>
      </LoginProvider>
    </RegistrationProvider>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import OtpValidation from "../components/PasswordReset/OtpValidation";
import PasswordReset from "../components/PasswordReset/PasswordReset";

const LoginRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="password-reset" element={<PasswordReset />} />
    <Route path="password-reset/otp-validation" element={<OtpValidation />} />
  </Routes>
);

export default LoginRoutes;

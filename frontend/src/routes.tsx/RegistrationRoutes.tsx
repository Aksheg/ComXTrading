import { Routes, Route } from "react-router-dom";
import RegistrationCategory from "../components/Registration/RegistrationCategory";
import CorporateRegistrationStep2 from "../components/Registration/CorporateRegistrationStep2";
import CorporateRegistrationStep3 from "../components/Registration/CorporateRegistrationStep3";
import CorporateRegistrationStep4 from "../components/Registration/CorporateRegistrationStep4";
import IndividualRegistrationStep2 from "../components/Registration/IndividualRegistrationStep2";
import IndividualRegistrationStep3 from "../components/Registration/IndividualRegistrationStep3";
import IndividualRegistrationStep4 from "../components/Registration/IndividualRegistrationStep4";

const RegistrationRoutes: React.FC = () => (
  <Routes>
    <Route path="information" element={<RegistrationCategory />} />
    <Route
      path="corporate/login-details"
      element={<CorporateRegistrationStep2 />}
    />
    <Route
      path="corporate/otp-verification"
      element={<CorporateRegistrationStep3 />}
    />
    <Route
      path="corporate/registration-successful"
      element={<CorporateRegistrationStep4 />}
    />
    <Route
      path="individual/login-details"
      element={<IndividualRegistrationStep2 />}
    />
    <Route
      path="individual/otp-verification"
      element={<IndividualRegistrationStep3 />}
    />
    <Route
      path="individual/registration-successful"
      element={<IndividualRegistrationStep4 />}
    />
  </Routes>
);

export default RegistrationRoutes;

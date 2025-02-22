import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Card, Input, ProgressSteps } from "../common";
import logo from "../../assets/images/logo.svg";
import {
  RegistrationState,
  useRegistration,
} from "../../context/RegistrationContext";
import { useFormValidation } from "../../utils/useFormValidation";
import ChatWidget from "../ChatWidget";
import { authService } from "../services/api";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const StyledCard = styled(Card)`
  height: 399px;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 33px;
  margin-top: -47px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 0.5px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
`;

const InputLabel = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
`;

const ActionButton = styled.button<{ variant: "back" | "finish" }>`
  background: none;
  border: none;
  color: ${(props) => (props.variant === "finish" ? "#ff0000" : "#333")};
  font-weight: 500;
  cursor: pointer;
  padding: 12px 0;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  align-items: flex-start;
`;

const ActionLink = styled.button`
  background: none;
  border: none;
  color: #98a9bccc;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  text-align: left;
`;

const StepText = styled.div`
  text-align: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0 24px 0;
  width: 458px;
`;

const CorporateRegistrationStep3: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useFormValidation(state, "corporate", 3);

  const handleBack = () => {
    navigate("/register/corporate/login-details");
  };

  const handleNextStep = async () => {
    try {
      console.log("Email being used for OTP verification:", state.email); // Debug log

      await authService.verifyOTP(state.email, values.verificationCode);

      const userData = {
        companyName: state.companyName,
        businessType: state.businessType,
        incorporationDate: state.incorporationDate,
        email: state.email,
        password: state.password,
        category: "corporate" as const,
        staySignedIn: state.staySignedIn,
      };

      console.log("Registering with data:", userData);

      const response = await authService.register(userData);

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      navigate("/register/corporate/registration-successful");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.resendOTP(state.email);
      console.log("OTP resent successfully.");
    } catch (error: any) {
      console.error("Failed to resend OTP:", error.message);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <StyledCard>
        <Title>Account details</Title>
        <Subtitle>Sign up for an account and start trading today</Subtitle>

        <form onSubmit={handleSubmit(handleNextStep)}>
          <InputLabel>
            Enter the 4-digit code that was sent to name@mymail.com
          </InputLabel>

          <Input
            name="verificationCode"
            type="text"
            placeholder="Enter code"
            value={values.verificationCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.verificationCode}
          />

          <LinkContainer>
            <ActionLink type="button" onClick={handleResendOTP}>
              Resend Code
            </ActionLink>
            <ActionLink type="button">Verify via Phone Call</ActionLink>
          </LinkContainer>

          <ButtonContainer>
            <ActionButton type="button" variant="back" onClick={handleBack}>
              BACK
            </ActionButton>
            <ActionButton type="submit" variant="finish">
              FINISH
            </ActionButton>
          </ButtonContainer>
        </form>
      </StyledCard>

      <StepsContainer>
        <StepText>3/4</StepText>
        <ProgressSteps currentStep={3} totalSteps={4} />
      </StepsContainer>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default CorporateRegistrationStep3;

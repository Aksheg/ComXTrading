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

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 33px;
  margin-top: -40px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
`;

const NextStepButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 0;
  width: 100%;
  text-align: center;
  margin-top: 16px;
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

const CorporateRegistrationStep2: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useFormValidation(state, "corporate", 2);

  const handleNextStep = async () => {
    try {
      Object.keys(values).forEach((key) => {
        const typedKey = key as keyof RegistrationState;
        dispatch({
          type: "UPDATE_FIELD",
          field: typedKey,
          value: values[typedKey],
        });
      });

      await authService.sendOTP(values.email);

      navigate("/register/corporate/otp-verification");
    } catch (error: any) {
      console.error("Failed to send OTP:", error.message);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <Card>
        <Title>Register new account</Title>
        <Subtitle>Sign up for an account and start trading today</Subtitle>

        <form onSubmit={handleSubmit(handleNextStep)}>
          <Input
            name="email"
            label="Company Email"
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
          />

          <NextStepButton type="submit">NEXT STEP</NextStepButton>
        </form>
      </Card>

      <StepsContainer>
        <StepText>2/4</StepText>
        <ProgressSteps currentStep={2} totalSteps={4} />
      </StepsContainer>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default CorporateRegistrationStep2;

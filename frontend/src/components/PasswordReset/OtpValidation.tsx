import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Card, Input } from "../common";
import logo from "../../assets/images/logo.svg";
import { useLogin } from "../../context/LoginContext";
import { useLoginFormValidation } from "../../utils/useLoginFormValidation";
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
  margin-top: -125px;
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
  margin-top: 99px;
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
`;

const ActionLink = styled.button`
  background: none;
  border: none;
  color: #98a9bccc;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  margin-top: -8px;
`;

const OtpValidation: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLogin();
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useLoginFormValidation(state, 2);

  const handleBack = () => {
    navigate("/sign-in/password-reset");
  };

  const handleFinish = async () => {
    try {
      await authService.verifyOTP(state.email, values.otp);

      navigate("/sign-in/password-reset/confirm");
    } catch (error: any) {
      console.error("OTP verification failed:", error.message);
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

        <form onSubmit={handleSubmit(handleFinish)}>
          <InputLabel>
            Enter the 4-digit code that was sent to name@mymail.com
          </InputLabel>

          <Input
            name="otp"
            type="text"
            placeholder="Enter code"
            value={values.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.otp}
          />

          <LinkContainer>
            <ActionLink type="button" onClick={handleResendOTP}>
              Resend Code
            </ActionLink>
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
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default OtpValidation;

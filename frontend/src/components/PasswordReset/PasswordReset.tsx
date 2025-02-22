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

const NoteText = styled.p`
  background: none;
  border: none;
  color: #98a9bccc;
  font-size: 12px;
  padding: 0;
  text-decoration: none;
  margin-top: -4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 99px;
`;

const ActionButton = styled.button<{ variant: "back" | "proceed" }>`
  background: none;
  border: none;
  color: ${(props) => (props.variant === "proceed" ? "#ff0000" : "#333")};
  font-weight: 500;
  cursor: pointer;
  padding: 12px 0;
`;

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLogin();
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useLoginFormValidation(state, 1);

  const handleBack = () => {
    navigate("/sign-in");
  };

  const handleProceed = async () => {
    try {
      await authService.requestPasswordReset(values.email);
      navigate("/sign-in/password-reset/otp-validation");
    } catch (error: any) {
      console.error("Failed to request password reset:", error.message);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <StyledCard>
        <Title>Password Reset</Title>
        <Subtitle>Reset your password to continue trading on ComX</Subtitle>

        <form onSubmit={handleSubmit(handleProceed)}>
          <InputLabel>Enter the Email Address you registered with</InputLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <NoteText>
            Note that you’ll be sent an OTP to the email address provided
          </NoteText>

          <ButtonContainer>
            <ActionButton type="button" variant="back" onClick={handleBack}>
              BACK
            </ActionButton>
            <ActionButton type="submit" variant="proceed">
              PROCEED
            </ActionButton>
          </ButtonContainer>
        </form>
      </StyledCard>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default PasswordReset;

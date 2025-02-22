import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "../common";
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
  padding: 0;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 33px;
  margin-top: -97px;
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

const StaySignedInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  margin-bottom: 26px;
`;

const StaySignedInCheckbox = styled.input`
  margin-right: 8px;
`;

const StaySignedInLabel = styled.label`
  font-size: 14px;
  color: #333;
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #ff0000;
  text-decoration: none;
  display: block;
  text-align: right;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 16px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLogin();
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useLoginFormValidation(state, 1);

  const handleLogin = async () => {
    try {
      const response = await authService.login(values.email, values.password);

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <Card>
        <Title>Sign in to ComX</Title>
        <Subtitle>Enter your login credentials below.</Subtitle>

        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            label="Your Email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <Input
            label="Your Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <StaySignedInContainer>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5px" }}
            >
              <StaySignedInCheckbox type="checkbox" id="staySignedIn" />
              <StaySignedInLabel htmlFor="staySignedIn">
                Stay Signed in
              </StaySignedInLabel>
            </div>
            <ForgotPasswordLink href="/sign-in/password-reset">
              Forgot Password?
            </ForgotPasswordLink>
          </StaySignedInContainer>
          <ButtonGroup>
            <Button type="submit" variant="primary">
              Sign in
            </Button>
            <Button type="button" variant="tertiary" onClick={handleBack}>
              Back
            </Button>
          </ButtonGroup>
        </form>
      </Card>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default Login;

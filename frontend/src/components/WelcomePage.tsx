import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button, Card } from "./common";
import ChatWidget from "./ChatWidget";

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
  margin-bottom: 47px;
  margin-top: -60px;
`;

const StyledCard = styled(Card)`
  width: 555px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 30px;
  color: #333;
  margin-bottom: 0.5px;
  font-weight: 400;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 49px;
  font-weight: 400;
`;

const StyledButton = styled(Button)`
  width: 450px;
  height: 46px;
  font-size: 14px;
  margin-bottom: 29px;
`;

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src={logo} alt="ComX" />
      <StyledCard>
        <Title>Sign in to ComX</Title>
        <Subtitle>Welcome to ComX</Subtitle>
        <StyledButton variant="primary" onClick={() => navigate("/sign-in")}>
          Sign in
        </StyledButton>
      </StyledCard>
      <StyledCard>
        <Title>Create an Account</Title>
        <Subtitle>Join the Family</Subtitle>
        <StyledButton
          variant="secondary"
          onClick={() => navigate("/register/information")}
        >
          Register
        </StyledButton>
      </StyledCard>
      <ChatWidget defaultVisible={true} />
    </Container>
  );
};

export default WelcomePage;

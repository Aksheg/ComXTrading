import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Card, ProgressSteps } from "../common";
import logo from "../../assets/images/logo.svg";
import success from "../../assets/images/success.svg";
import ChatWidget from "../ChatWidget";

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

const SuccessImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`;

const SuccessImage = styled.img`
  width: 200px;
  height: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
`;

const DashboardButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 0;
  width: 100%;
  text-align: center;
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

const IndividualRegistrationStep4: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <Card>
        <SuccessImageContainer>
          <SuccessImage src={success} alt="Success illustration" />
        </SuccessImageContainer>
        <Title>Registration Complete</Title>
        <Message>
          Dear {"{Name}"}, your registration is now complete.
          <br />
          You may proceed to your dashboard and start trading commodities.
        </Message>

        <DashboardButton onClick={() => navigate("/dashboard")}>
          GO TO DASHBOARD
        </DashboardButton>
      </Card>

      <StepsContainer>
        <StepText>4/4</StepText>
        <ProgressSteps currentStep={4} totalSteps={4} />
      </StepsContainer>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default IndividualRegistrationStep4;

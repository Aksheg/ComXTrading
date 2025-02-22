import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Input, Select, Card, ProgressSteps } from "../common";
import logo from "../../assets/images/logo.svg";
import {
  RegistrationState,
  useRegistration,
} from "../../context/RegistrationContext";
import { useFormValidation } from "../../utils/useFormValidation";
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

const CategoryText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;
`;

const Tab = styled.button<{ isSelected: boolean }>`
  width: 146px;
  height: 52px;
  margin-top: 3px;
  background: ${({ isSelected }) => (isSelected ? "#1A1A1A" : "#FFFFFF")};
  color: ${({ isSelected }) => (isSelected ? "#FFFFFF" : "#1A1A1A")};
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;

  &:first-child {
    border-radius: 2px 0 0 2px;
  }

  &:last-child {
    border-radius: 0 2px 2px 0;
  }
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

const RegistrationCategory: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const navigate = useNavigate();
  const [category, setCategory] = useState<"individual" | "corporate">(
    state.category || "corporate"
  );

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useFormValidation(state, category, 1);

  const handleNextStep = () => {
    console.log("Navigating to next step");

    dispatch({
      type: "UPDATE_FIELD",
      field: "category",
      value: category,
    });

    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof RegistrationState;
      dispatch({
        type: "UPDATE_FIELD",
        field: typedKey,
        value: values[typedKey],
      });
    });

    if (category === "individual") {
      navigate("/register/individual/login-details");
    } else {
      navigate("/register/corporate/login-details");
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="ComX" />

      <Card>
        <Title>Register new account</Title>
        <Subtitle>Sign up for an account and start trading today</Subtitle>
        <CategoryText>Select the category that best describes you</CategoryText>
        <TabGroup>
          <Tab
            isSelected={category === "individual"}
            onClick={() => setCategory("individual")}
            type="button"
          >
            Individual
          </Tab>
          <Tab
            isSelected={category === "corporate"}
            onClick={() => setCategory("corporate")}
            type="button"
          >
            Corporate
          </Tab>
        </TabGroup>

        <form onSubmit={handleSubmit(handleNextStep)}>
          {category === "corporate" ? (
            <>
              <Input
                name="companyName"
                label="Company Name"
                type="text"
                placeholder="Enter your company name"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.companyName}
              />

              <div style={{ display: "flex", gap: "16px" }}>
                <Select
                  name="businessType"
                  label="Type of Business"
                  value={values.businessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.businessType}
                  options={[
                    {
                      value: "",
                      label: "Select Type of Business",
                      color: "#999",
                    },
                    { value: "llc", label: "LLC" },
                    { value: "corporation", label: "Corporation" },
                    { value: "partnership", label: "Partnership" },
                  ]}
                />

                <Input
                  name="incorporationDate"
                  label="Date of Incorporation"
                  type="date"
                  value={values.incorporationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.incorporationDate}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: "16px" }}>
                <Input
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter your First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName}
                />
              </div>

              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
              />
            </>
          )}

          <NextStepButton type="submit">NEXT STEP</NextStepButton>
        </form>
      </Card>

      <StepsContainer>
        <StepText>1/4</StepText>
        <ProgressSteps currentStep={1} totalSteps={4} />
      </StepsContainer>
      <ChatWidget defaultVisible={false} />
    </Container>
  );
};

export default RegistrationCategory;

import React, {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import styled from "styled-components";

// Common Types
type Variant = "primary" | "secondary" | "tertiary";

// Button Types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const StyledButton = styled.button<{ variant?: Variant }>`
  padding: 12px 24px;
  border-radius: 4px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  ${({ variant }) =>
    variant === "primary" &&
    `
    background-color: #52965E;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
    background-color: #1a1a1a;
    color: white;
    &:hover {
      background-color: #333;
    }
  `}

  ${({ variant }) =>
    variant === "tertiary" &&
    `
    background-color: #F8FAFB;
    color: #333;
    &:hover {
      background-color: #f0f1f1;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

// Input Types
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

const StyledInput = styled.input<{ error?: string }>`
  padding: 12px;
  border: 1px solid ${({ error }) => (error ? "#ff0000" : "#e0e0e0")};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#ff0000" : "#4caf50")};
  }

  &::placeholder {
    color: #999;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 6px;
`;

const ErrorText = styled.span`
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <InputWrapper>
    {label && <Label>{label}</Label>}
    <StyledInput error={error} {...props} />
    {error && <ErrorText>{error}</ErrorText>}
  </InputWrapper>
);

// Select Types
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string; color?: string }>;
  label?: string;
  error?: string;
}

const StyledSelect = styled.select<{ error?: string }>`
  padding: 12px;
  border: 1px solid ${({ error }) => (error ? "#ff0000" : "#e0e0e0")};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#ff0000" : "#4caf50")};
  }

  option {
    color: #333;
    &:first-child {
      color: #999;
    }
  }
`;

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  ...props
}) => (
  <InputWrapper>
    {label && <Label>{label}</Label>}
    <StyledSelect error={error} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
    {error && <ErrorText>{error}</ErrorText>}
  </InputWrapper>
);

// Progress Steps Types
interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}


const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Step = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#D71E0E" : "#e0e0e0")};
  z-index: 1;
`;

const Connector = styled.div<{ active: boolean }>`
  height: 4px;
  flex-grow: 1;
  background-color: ${({ active }) => (active ? "#D71E0E" : "#e0e0e0")};
`;

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  totalSteps,
}) => (
  <ProgressBarContainer>
    {Array.from({ length: totalSteps }).map((_, index) => (
      <React.Fragment key={index}>
        <Step active={index < currentStep} />
        {index < totalSteps - 1 && (
          <Connector active={index < currentStep - 1} />
        )}
      </React.Fragment>
    ))}
  </ProgressBarContainer>
);

// Card Types
interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = styled.div<CardProps>`
  background: #FFFFFF;
  border-radius: 4px;
  padding: 24px 35px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const commonComponents = {
  Button,
  Input,
  Select,
  ProgressSteps,
  Card,
};

export default commonComponents;

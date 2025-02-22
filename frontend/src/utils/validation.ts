import { RegistrationState } from "../context/RegistrationContext";
import { LoginState } from "../context/LoginContext";

export const validateField = (
  name: keyof RegistrationState,
  value: string,
  values: RegistrationState,
  category: "individual" | "corporate",
  step: number
): string => {
  switch (name) {
    // Step 1 validation for corporate
    case "companyName":
      if (category === "corporate" && step === 1 && !value.trim())
        return "Company name is required";
      return "";

    case "businessType":
      if (category === "corporate" && step === 1 && !value)
        return "Business type is required";
      return "";

    case "incorporationDate":
      if (category === "corporate" && step === 1 && !value)
        return "Incorporation date is required";
      return "";

    // Step 1 validation for individual
    case "firstName":
      if (category === "individual" && step === 1 && !value.trim())
        return "First name is required";
      return "";

    case "lastName":
      if (category === "individual" && step === 1 && !value.trim())
        return "Last name is required";
      return "";

    case "email":
      if (category === "individual" && step === 1 && !value)
        return "Email is required";
      if (
        category === "individual" &&
        step === 1 &&
        !/\S+@\S+\.\S+/.test(value)
      )
        return "Please enter a valid email";
      if (category === "corporate" && step === 2 && !value)
        return "Email is required";
      if (category === "corporate" && step === 2 && !/\S+@\S+\.\S+/.test(value))
        return "Please enter a valid email";
      return "";

    // Step 2 validation for corporate and individual
    case "password":
      if (step === 2 && !value) return "Password is required";
      if (step === 2 && value.length < 8)
        return "Password must be at least 8 characters";
      return "";

    case "confirmPassword":
      if (step === 2 && !value) return "Please confirm your password";
      if (step === 2 && values.password && value !== values.password)
        return "Passwords do not match";
      return "";

    // Step 2 validation for individual
    case "phoneNumber":
      if (category === "individual" && step === 2 && !value)
        return "Phone number is required";
      return "";

    // Step 3 validation for verificationCode
    case "verificationCode":
      if (step === 3 && !value.trim()) return "Verification code is required";
      if (step === 3 && value.length !== 4)
        return "Verification code must be 4 digits";
      return "";

    case "email":
      if (
        (category === "individual" && step === 1) ||
        (category === "corporate" && step === 2)
      ) {
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
      }
      return "";

    default:
      return "";
  }
};

export const validateLoginField = (
  name: keyof LoginState,
  value: string,
  step: number
): string => {
  switch (name) {
    // Step 1: Login validation (email and password)
    case "email":
      if (step === 1 && !value) return "Email is required";
      if (step === 1 && !/\S+@\S+\.\S+/.test(value))
        return "Please enter a valid email";
      return "";

    case "password":
      if (step === 1 && !value) return "Password is required";
      if (step === 1 && value.length < 8)
        return "Password must be at least 8 characters";
      return "";

    // Step 2: OTP validation
    case "otp":
      if (step === 2 && !value.trim()) return "Verification code is required";
      if (step === 2 && value.length !== 4)
        return "Verification code must be 4 digits";
      return "";

    default:
      return "";
  }
};

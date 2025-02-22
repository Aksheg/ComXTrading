import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { LoginState } from "../context/LoginContext";
import { validateLoginField } from "./validation";

export const useLoginFormValidation = (
  initialState: LoginState,
  step: number
) => {
  const [values, setValues] = useState<LoginState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginState, string>>
  >({} as Partial<Record<keyof LoginState, string>>);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      setIsSubmitting(!noErrors);
    }
  }, [errors]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const typedName = name as keyof LoginState;

    const validationError = validateLoginField(typedName, value, step);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [typedName]: validationError,
    }));
  };

  const handleSubmit =
    (callback: () => void) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Form submitted");

      const validationErrors: Partial<Record<keyof LoginState, string>> = {};

      // Step 1: Login validation (email and password)
      if (step === 1) {
        const loginFields: (keyof LoginState)[] = ["email", "password"];
        loginFields.forEach((field) => {
          const error = validateLoginField(field, values[field], step);
          if (error) validationErrors[field] = error;
        });
      }

      // Step 2: OTP validation
      else if (step === 2) {
        const otpFields: (keyof LoginState)[] = ["otp"];
        otpFields.forEach((field) => {
          const error = validateLoginField(field, values[field], step);
          if (error) validationErrors[field] = error;
        });
      }

      setErrors(validationErrors);
      setIsSubmitting(true);

      if (Object.keys(validationErrors).length === 0) {
        console.log("No validation errors, calling callback");
        callback();
      } else {
        console.log("Validation errors:", validationErrors);
      }
    };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

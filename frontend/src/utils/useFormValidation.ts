import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { RegistrationState } from "../context/RegistrationContext";
import { validateField } from "./validation";

export const useFormValidation = (
  initialState: RegistrationState,
  category: "individual" | "corporate",
  step: number
) => {
  const [values, setValues] = useState<RegistrationState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationState, string>>
  >({} as Partial<Record<keyof RegistrationState, string>>);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      setIsSubmitting(!noErrors);
    }
  }, [errors]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const typedName = name as keyof RegistrationState;

    const validationError = validateField(
      typedName,
      value,
      values,
      category,
      step
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [typedName]: validationError,
    }));
  };

  const handleSubmit =
    (callback: () => void) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Form submitted");

      const validationErrors: Partial<Record<keyof RegistrationState, string>> =
        {};

      // Step 1 validation for corporate
      if (category === "corporate" && step === 1) {
        const corporateFields: (keyof RegistrationState)[] = [
          "companyName",
          "businessType",
          "incorporationDate",
        ];
        corporateFields.forEach((field) => {
          const error = validateField(
            field,
            values[field] as string,
            values,
            category,
            step
          );
          if (error) validationErrors[field] = error;
        });
      }

      // Step 1 validation for individual
      else if (category === "individual" && step === 1) {
        const individualFields: (keyof RegistrationState)[] = [
          "firstName",
          "lastName",
          "email",
        ];
        individualFields.forEach((field) => {
          const error = validateField(
            field,
            values[field] as string,
            values,
            category,
            step
          );
          if (error) validationErrors[field] = error;
        });
      }

      // Step 2 validation for both corporate and individual
      else if (step === 2) {
        const step2Fields: (keyof RegistrationState)[] = [
          "password",
          "confirmPassword",
        ];
        if (category === "corporate") {
          step2Fields.push("email");
        } else if (category === "individual") {
          step2Fields.push("phoneNumber");
        }
        step2Fields.forEach((field) => {
          const error = validateField(
            field,
            values[field] as string,
            values,
            category,
            step
          );
          if (error) validationErrors[field] = error;
        });
      }

      // Step 3 validation (if applicable)
      else if (step === 3) {
        const step3Fields: (keyof RegistrationState)[] = ["verificationCode"];
        step3Fields.forEach((field) => {
          const error = validateField(
            field,
            values[field] as string,
            values,
            category,
            step
          );
          if (error) validationErrors[field] = error;
        });
      }

      // Step 4 validation (if applicable)
      else if (step === 4) {
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

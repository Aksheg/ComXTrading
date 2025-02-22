import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export interface RegistrationState {
  companyName: string;
  businessType: string;
  incorporationDate: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  category: "individual" | "corporate";
  staySignedIn: boolean;
}

type RegistrationAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof RegistrationState;
      value: string | boolean;
    }
  | { type: "RESET_FORM" };

interface RegistrationContextType {
  state: RegistrationState;
  dispatch: Dispatch<RegistrationAction>;
}

const initialState: RegistrationState = {
  companyName: "",
  businessType: "",
  incorporationDate: "",
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  countryCode: "+234",
  category: "corporate",
  staySignedIn: false,
};
const registrationReducer = (
  state: RegistrationState,
  action: RegistrationAction
): RegistrationState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};

import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

interface RegisterPayload {
  companyName?: string;
  businessType?: string;
  incorporationDate?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  category: "individual" | "corporate";
  staySignedIn: boolean;
}

interface ApiResponse {
  user: any;
  token: string;
  message?: string;
}

export const authService = {
  register: async (userData: RegisterPayload): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  verifyOTP: async (email: string, otp: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        email,
        code: otp,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  },

  resendOTP: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, {
        email,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to resend OTP");
    }
  },

  requestPasswordReset: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/password-reset/request`,
        { email }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to request password reset"
      );
    }
  },

  sendOTP: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        email,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to send OTP");
    }
  },
};

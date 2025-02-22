import express from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/password-reset/request", requestPasswordReset);
router.post("/password-reset/confirm", resetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", sendOTP); 
router.post("/send-otp", sendOTP); 

export default router;

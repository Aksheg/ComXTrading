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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user (Individual or Corporate)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 description: Individual Registration
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@gmail.com
 *                   password:
 *                     type: string
 *                     example: securepassword@123
 *                   phoneNumber:
 *                     type: string
 *                     example: "8166473773"
 *                   countryCode:
 *                     type: string
 *                     example: "+234"
 *                   category:
 *                     type: string
 *                     enum: [individual, corporate]
 *                     example: individual
 *                   staySignedIn:
 *                     type: boolean
 *                     example: false
 *               - type: object
 *                 description: Corporate Registration
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: Tech Corp
 *                   businessType:
 *                     type: string
 *                     example: corporation
 *                   incorporationDate:
 *                     type: string
 *                     format: date
 *                     example: 2024-01-15
 *                   email:
 *                     type: string
 *                     example: company1@gmail.com
 *                   password:
 *                     type: string
 *                     example: password@123
 *                   category:
 *                     type: string
 *                     enum: [individual, corporate]
 *                     example: corporate
 *                   staySignedIn:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/password-reset/request:
 *   post:
 *     summary: Request a password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Invalid email
 */
router.post("/password-reset/request", requestPasswordReset);

/**
 * @swagger
 * /api/auth/password-reset/confirm:
 *   post:
 *     summary: Confirm password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abcd1234"
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or weak password
 */
router.post("/password-reset/confirm", resetPassword);

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: OTP sending failed
 */
router.post("/send-otp", sendOTP);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               otp:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post("/verify-otp", verifyOTP);

export default router;

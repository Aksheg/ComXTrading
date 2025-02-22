import { Request, Response } from "express";
import { User } from "../models/user.model";
import { OTP } from "../models/otp.model";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/auth.utils";
import { Op } from "sequelize";

export const register = async (req: Request, res: Response) => {
  const {
    companyName,
    businessType,
    incorporationDate,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    countryCode,
    category,
    staySignedIn,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      companyName,
      businessType,
      incorporationDate,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      countryCode,
      category,
      staySignedIn,
    });

    const tempOTP = tempOTPStorage[email];

    if (tempOTP) {
      await OTP.create({
        code: tempOTP.code,
        expiresAt: tempOTP.expiresAt,
        userId: user.id,
      });

      delete tempOTPStorage[email];
    }

    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({ code, expiresAt, userId: user.id });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error requesting password reset.", error });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const otp = await OTP.findOne({
      where: {
        code,
        userId: user.id,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!otp) {
      res.status(400).json({ message: "Invalid or expired OTP." });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    await user.update({ password: hashedPassword });
    await otp.destroy();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    console.log("Email received for OTP verification:", email); // Debug log
    console.log("OTP code received:", code); // Debug log

    // Check temporary storage for unregistered users
    const tempOTP = tempOTPStorage[email];

    if (tempOTP && tempOTP.code === code && tempOTP.expiresAt > new Date()) {
      console.log("OTP verified from temporary storage for email:", email); // Debug log
      delete tempOTPStorage[email]; // Remove the OTP after verification
      res.status(200).json({ message: "OTP verified successfully." });
      return;
    }

    // Check the database for registered users
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("User not found for email:", email); // Debug log
      res.status(404).json({ message: "User not found." });
      return;
    }

    const otp = await OTP.findOne({
      where: {
        code,
        userId: user.id,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!otp) {
      console.log("Invalid or expired OTP for user:", user.id); // Debug log
      res.status(400).json({ message: "Invalid or expired OTP." });
      return;
    }

    console.log("OTP verified successfully for user:", user.id); // Debug log
    await otp.destroy();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Debug log
    res.status(500).json({ message: "Error verifying OTP.", error });
  }
};

const tempOTPStorage: Record<string, { code: string; expiresAt: Date }> = {};

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    console.log("Email received for OTP generation:", email); // Debug log

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const user = await User.findOne({ where: { email } });

    if (user) {
      console.log("User found, saving OTP in database for user:", user.id); // Debug log
      await OTP.create({
        code,
        expiresAt,
        userId: user.id,
      });
    } else {
      console.log(
        "User not found, saving OTP in temporary storage for email:",
        email
      ); // Debug log
      tempOTPStorage[email] = { code, expiresAt };
    }

    console.log(`OTP for ${email}: ${code}`);

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error); // Debug log
    res.status(500).json({ message: "Error sending OTP.", error });
  }
};

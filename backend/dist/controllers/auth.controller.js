"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const otp_model_1 = require("../models/otp.model");
const auth_utils_1 = require("../utils/auth.utils");
const sequelize_1 = require("sequelize");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, businessType, incorporationDate, email, password, firstName, lastName, phoneNumber, countryCode, category, staySignedIn, } = req.body;
    try {
        const hashedPassword = yield (0, auth_utils_1.hashPassword)(password);
        const user = yield user_model_1.User.create({
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
        const token = (0, auth_utils_1.generateToken)(user.id);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user.", error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const isMatch = yield (0, auth_utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials." });
            return;
        }
        const token = (0, auth_utils_1.generateToken)(user.id);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in.", error });
    }
});
exports.login = login;
const requestPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_model_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        yield otp_model_1.OTP.create({ code, expiresAt, userId: user.id });
        res.status(200).json({ message: "OTP sent to your email." });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error requesting password reset.", error });
    }
});
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, newPassword } = req.body;
        const user = yield user_model_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const otp = yield otp_model_1.OTP.findOne({
            where: {
                code,
                userId: user.id,
                expiresAt: { [sequelize_1.Op.gt]: new Date() },
            },
        });
        if (!otp) {
            res.status(400).json({ message: "Invalid or expired OTP." });
            return;
        }
        const hashedPassword = yield (0, auth_utils_1.hashPassword)(newPassword);
        yield user.update({ password: hashedPassword });
        yield otp.destroy();
        res.status(200).json({ message: "Password reset successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Error resetting password.", error });
    }
});
exports.resetPassword = resetPassword;

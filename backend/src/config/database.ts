import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import OTP from "../models/otp.model";
import User from "../models/user.model";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite" as const,
  storage: process.env.DB_PATH || "./database.sqlite",
  models: [User, OTP],
  logging: console.log,
});

export default sequelize;

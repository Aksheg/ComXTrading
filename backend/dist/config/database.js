"use strict";
// import { Sequelize } from "sequelize-typescript";
// import dotenv from "dotenv";
// import OTP from "../models/otp.model";
// import User from "../models/user.model";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST || "localhost",
//   port: parseInt(process.env.DB_PORT || "5432", 10),
//   dialect: "postgres" as const,
//   models: [User, OTP],
//   logging: false,
// });
// export default sequelize;
// import { Sequelize } from "sequelize-typescript";
// import dotenv from "dotenv";
// import OTP from "../models/otp.model";
// import User from "../models/user.model";
// dotenv.config();
// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST || "localhost",
//   port: parseInt(process.env.DB_PORT || "3306", 10),
//   dialect: "mysql" as const,
//   models: [User, OTP],
//   logging: false,
// });
// export default sequelize;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH || "./database.sqlite",
    models: [user_model_1.default, otp_model_1.default],
    logging: false,
});
exports.default = sequelize;

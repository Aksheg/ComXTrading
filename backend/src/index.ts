import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

setupSwagger(app);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(
        `Swagger Docs available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

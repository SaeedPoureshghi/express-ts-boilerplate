import express from "express";
import { config } from "./config/dotenv";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { swaggerOptions } from "./config/swagger";
import cors from "cors";
import api from "@/routes/PublicRoutes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
expressJSDocSwagger(app)(swaggerOptions);

app.use("/api/v1", api);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`API Docs: http://localhost:${config.port}/api-docs`);
});

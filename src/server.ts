import express from "express";
import { config } from "./config/dotenv";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { swaggerOptions } from "./config/swagger";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "@/routes/index";
import { swaggerBasicAuth } from "@/middlewares/SwaggerAuth";

// create express app
const app = express();

// use express json
app.use(express.json());

// use cookie parser
app.use(cookieParser());

// use cors for better security
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

if (config.docs) {
  // protect swagger docs route with basic authentication
  app.use("/api-docs", swaggerBasicAuth);
  app.use("/api-docs/*", swaggerBasicAuth);

  // use swagger for api documentation
  expressJSDocSwagger(app)(swaggerOptions);
}

// use api routes
app.use("/api/v1", api);

// use 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

// listen on port
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  if (config.docs) {
    console.log(`API Docs: http://localhost:${config.port}/api-docs`);
  }
});

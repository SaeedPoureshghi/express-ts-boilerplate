import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mode: process.env.NODE_ENV || "development",
  jweSecret: process.env.JWE_SECRET || process.env.JWT_SECRET || "",
  jweExpirationTime: process.env.JWE_EXPIRATION_TIME || "1h",
  swaggerUsername: process.env.SWAGGER_USERNAME || "admin",
  swaggerPassword: process.env.SWAGGER_PASSWORD || "admin",
  docs: process.env.DOCS || false,
};

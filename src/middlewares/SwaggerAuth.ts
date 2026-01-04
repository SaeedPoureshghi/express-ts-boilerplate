import { Request, Response, NextFunction } from "express";
import { config } from "@/config/dotenv";

export const swaggerBasicAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const swaggerUsername = config.swaggerUsername;
  const swaggerPassword = config.swaggerPassword;

  if (!swaggerUsername || !swaggerPassword) {
    console.error("SWAGGER_USERNAME and SWAGGER_PASSWORD must be configured");
    res.status(500).json({
      success: false,
      message: "Server configuration error",
    });
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res
      .status(401)
      .setHeader("WWW-Authenticate", 'Basic realm="Swagger API Docs"');
    res.json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  if (username === swaggerUsername && password === swaggerPassword) {
    next();
  } else {
    res
      .status(401)
      .setHeader("WWW-Authenticate", 'Basic realm="Swagger API Docs"');
    res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

import path from "path";
export const swaggerOptions = {
  info: {
    version: "1.0.0",
    title: "Express API",
    description: "Express API boilerplate",
    contact: {
      name: "API Support",
      email: "info@saeedpoureshghi.dev",
    },
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    CookieAuth: {
      type: "apiKey",
      scheme: "cookie",
      name: "refreshToken",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server",
    },
  ],
  baseDir: path.join(__dirname, ".."),
  filesPattern: [
    "./routes/*.ts",
    "./types/**/*.ts",
    "./routes/*.js",
    "./types/**/*.js",
  ],
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  notRequiredAsNullable: false,
  swaggerUiOptions: {
    customSiteTitle: "EXPRESS API Documentation",
  },
};

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-XX

### Added

- **JWE (JSON Web Encryption) Authentication System**

  - JWE token creation endpoint (`POST /api/v1/protected/create-token`)
  - JWE token validation middleware for protected routes
  - Cookie-based token storage with secure HTTP-only cookies
  - Support for base64 and UTF-8 encoded secrets
  - Automatic key padding/truncation to 32 bytes for A256GCM encryption

- **Protected Routes**

  - Protected route endpoint (`GET /api/v1/protected`) requiring authentication
  - User information extraction from JWE tokens
  - Type-safe user object in Express Request

- **Public Routes**

  - Hello World endpoint (`GET /api/v1/`) for health checks

- **API Documentation**

  - Swagger/OpenAPI integration with `express-jsdoc-swagger`
  - Interactive API documentation at `/api-docs`
  - JSDoc annotations for all endpoints
  - Support for Bearer and Cookie authentication schemes in Swagger

- **Security Features**

  - CORS configuration with allowed origins and credentials
  - HTTP-only cookies for token storage
  - Secure cookie flags for production environment
  - SameSite cookie protection

- **Development Tools**

  - TypeScript configuration with path aliases (`@/`, `@controllers/`, `@routes/`, etc.)
  - Hot-reload development server with `ts-node-dev`
  - Production build with TypeScript compilation and path alias resolution
  - Environment variable management with dotenv

- **Project Structure**
  - MVC architecture (Controllers, Services, Routes, Middlewares)
  - Type-safe Express Request with custom User interface
  - Centralized configuration management
  - Separation of concerns with dedicated service layer

### Technical Details

- **Dependencies:**

  - Express.js 4.21.2
  - TypeScript 5.7.3
  - jose 6.1.3 (JWE/JWT handling)
  - express-jsdoc-swagger 1.8.0 (API documentation)
  - cookie-parser 1.4.7
  - cors 2.8.5
  - dotenv 16.4.7

- **Configuration:**
  - Configurable port (default: 3000)
  - Environment-based mode (development/production)
  - JWE secret key configuration
  - Token expiration time configuration (default: 1h)

### Security Notes

- JWE tokens use A256GCM encryption algorithm
- Tokens are stored in HTTP-only cookies to prevent XSS attacks
- Secure flag enabled in production environment
- SameSite strict policy for CSRF protection
- CORS configured with specific allowed origins

# Release Notes - v1.1.0

## Overview

This release introduces a comprehensive Express TypeScript boilerplate with JWE authentication, Swagger documentation, and a production-ready architecture.

## What's New

### JWE Authentication System

- Complete JWE (JSON Web Encryption) token implementation
- Secure cookie-based token storage
- Authentication middleware for route protection
- Support for base64 and UTF-8 encoded secrets
- Automatic key management for A256GCM encryption

### Security Enhancements

- HTTP-only cookies to prevent XSS attacks
- Secure cookie flags for production
- SameSite strict policy for CSRF protection
- Configurable CORS with credentials support

### API Documentation

- Swagger/OpenAPI integration
- Interactive API documentation at `/api-docs`
- JSDoc annotations for all endpoints
- Support for multiple authentication schemes in Swagger

### Architecture Improvements

- Clean MVC pattern implementation
- Type-safe Express Request with custom User interface
- Path aliases for cleaner imports
- Centralized configuration management
- Separation of concerns with service layer

## API Endpoints

### Public Endpoints

- `GET /api/v1/` - Hello World endpoint

### Protected Endpoints

- `POST /api/v1/protected/create-token` - Create and store JWE token
- `GET /api/v1/protected` - Access protected resource (requires authentication)

## Breaking Changes

None - This is the initial feature release.

## Migration Guide

### For New Users

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Create `.env` file with required variables:
   ```
   PORT=3000
   NODE_ENV=development
   JWE_SECRET=your-secret-key-here
   JWE_EXPIRATION_TIME=2h
   ```
4. Run `npm run dev` to start the development server

### Environment Variables

- `JWE_SECRET` is required (minimum 32 characters or base64-encoded 32 bytes)
- `JWE_EXPIRATION_TIME` defaults to "1h" if not specified
- `PORT` defaults to 3000 if not specified

## Technical Details

### Dependencies

- Express.js 4.21.2
- TypeScript 5.7.3
- jose 6.1.3 (JWE/JWT handling)
- express-jsdoc-swagger 1.8.0 (API documentation)
- cookie-parser 1.4.7
- cors 2.8.5
- dotenv 16.4.7

### Encryption

- Algorithm: A256GCM (AES-256-GCM)
- Key size: 32 bytes
- Token format: JWE (JSON Web Encryption)

## Known Issues

None at this time.

## Future Roadmap

- Refresh token mechanism
- Role-based access control (RBAC)
- Rate limiting middleware
- Request validation middleware
- Database integration examples
- Unit and integration tests
- Docker configuration
- CI/CD pipeline examples

## Support

For issues, questions, or contributions, please refer to the main README.md file.

## Credits

Developed by saeed poureshghi

---

**Release Date**: December 2024  
**Version**: 1.1.0

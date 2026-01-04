# Express TypeScript Boilerplate

A modern, production-ready Express.js boilerplate built with TypeScript, featuring JWE authentication, Swagger documentation, and a clean MVC architecture.

## Features

### Authentication & Security

- **JWE (JSON Web Encryption) Token System**: Secure token-based authentication using JWE encryption
- **Cookie-based Authentication**: HTTP-only cookies for secure token storage
- **Authentication Middleware**: Protect routes with JWE token validation
- **Rate Limiting**: IP-based rate limiting to prevent abuse and protect against DDoS attacks
- **CORS Configuration**: Configurable CORS with credentials support
- **Security Best Practices**: Secure cookies, SameSite protection, and environment-based security flags

### API Documentation

- **Swagger/OpenAPI Integration**: Automatic API documentation generation
- **Interactive API Docs**: Access documentation at `/api-docs`
- **JSDoc Annotations**: Type-safe API documentation with JSDoc comments
- **Multiple Auth Schemes**: Support for Bearer and Cookie authentication in Swagger

### Architecture

- **MVC Pattern**: Clean separation with Controllers, Services, Routes, and Middlewares
- **TypeScript**: Full type safety with custom type definitions
- **Path Aliases**: Clean imports with `@/`, `@controllers/`, `@routes/` aliases
- **Environment Configuration**: Centralized configuration management

### Development Tools

- **Hot Reload**: Development server with automatic reloading
- **TypeScript Compilation**: Production build with path alias resolution
- **Environment Variables**: dotenv integration for configuration

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd express-ts-boilerplate
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
JWE_SECRET=your-secret-key-here-minimum-32-characters
JWE_EXPIRATION_TIME=2h
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=admin
```

**Important**:

- The `JWE_SECRET` should be:
  - At least 32 characters long, OR
  - A base64-encoded 32-byte value
  - Kept secure and never committed to version control
- The `SWAGGER_USERNAME` and `SWAGGER_PASSWORD` are used for Basic Authentication to protect the Swagger documentation. Change these from the default values in production.

### Running the Application

#### Development Mode

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

#### Production Mode

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Endpoints

### Public Routes

#### `GET /api/v1/`

Returns a hello world message.

**Response:**

```json
{
  "success": true,
  "message": "Hello World"
}
```

### Protected Routes

#### `POST /api/v1/protected/create-token`

Creates a JWE token and saves it to an HTTP-only cookie.

**Response:**

```json
{
  "success": true,
  "message": "JWE token created and saved to cookie"
}
```

**Note**: The token is automatically saved to a cookie named `token` with the following properties:

- HTTP-only (prevents JavaScript access)
- Secure (HTTPS only in production)
- SameSite: strict (CSRF protection)
- Max age: 2 hours

#### `GET /api/v1/protected`

Protected route that requires authentication via cookie.

**Headers Required:**

- Cookie: `token=<jwe-token>`

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "user": {
    "id": 12345,
    "name": "John Doe"
  }
}
```

#### `GET /api/v1/protected/rate-limited`

Rate-limited route that demonstrates rate limiting functionality. This endpoint is limited to 5 requests per minute per IP address.

**Rate Limit:**

- **Window**: 1 minute
- **Max Requests**: 5 per IP address
- **Headers**: Rate limit information is included in response headers

**Response (Success):**

```json
{
  "success": true,
  "message": "You are inside rates."
}
```

**Response (Rate Limit Exceeded - 429):**

```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

## API Documentation

Once the server is running, access the interactive Swagger documentation at:

```
http://localhost:3000/api-docs
```

**Note**: The Swagger documentation is protected with Basic Authentication. You'll need to provide the credentials configured in your `.env` file (`SWAGGER_USERNAME` and `SWAGGER_PASSWORD`) when accessing the documentation.

The documentation includes:

- All available endpoints
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

## Project Structure

```
express-ts-boilerplate/
├── src/
│   ├── config/          # Configuration files
│   │   ├── dotenv.ts    # Environment variables
│   │   └── swagger.ts   # Swagger configuration
│   ├── controllers/     # Request handlers
│   │   ├── PublicController.ts
│   │   └── ProtectedController.ts
│   ├── middlewares/     # Express middlewares
│   │   ├── Auth.ts      # JWE authentication middleware
│   │   └── RateLimitter.ts  # Rate limiting middleware
│   ├── routes/          # Route definitions
│   │   ├── index.ts     # Main router
│   │   ├── PublicRoutes.ts
│   │   └── ProtectedRoutes.ts
│   ├── services/        # Business logic
│   │   ├── PublicService.ts
│   │   └── ProtectedService.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── global.d.ts  # Global type extensions
│   │   └── swagger.ts   # Swagger type definitions
│   └── server.ts        # Application entry point
├── dist/                # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env                 # Environment variables (create this)
```

## Configuration

### Environment Variables

| Variable              | Description                   | Default       | Required |
| --------------------- | ----------------------------- | ------------- | -------- |
| `PORT`                | Server port number            | `3000`        | No       |
| `NODE_ENV`            | Environment mode              | `development` | No       |
| `JWE_SECRET`          | Secret key for JWE encryption | -             | Yes      |
| `JWE_EXPIRATION_TIME` | Token expiration time         | `1h`          | No       |

### JWE Secret Format

The `JWE_SECRET` can be provided in two formats:

1. **Plain text**: Must be at least 32 characters long

   ```
   JWE_SECRET=my-super-secret-key-that-is-at-least-32-chars
   ```

2. **Base64 encoded**: Must decode to exactly 32 bytes
   ```bash
   # Generate a 32-byte base64 secret
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

The system will automatically:

- Try to decode as base64 first
- Fall back to UTF-8 encoding if base64 decode fails
- Pad or truncate to exactly 32 bytes for A256GCM encryption

## Authentication Flow

1. **Create Token**: Call `POST /api/v1/protected/create-token` to generate a JWE token
2. **Token Storage**: The token is automatically saved to an HTTP-only cookie
3. **Access Protected Routes**: Include the cookie in subsequent requests
4. **Token Validation**: The `authMiddleware` validates the token and extracts user information
5. **User Context**: Access user data via `req.user` in protected route handlers

## TypeScript Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/`
- `@controllers/` → `src/controllers/`
- `@routes/` → `src/routes/`
- `@services/` → `src/services/`
- `@middlewares/` → `src/middlewares/`
- `@config/` → `src/config/`
- `@types/` → `src/types/`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Rate Limiting

The boilerplate includes a rate limiting middleware to protect your API from abuse and DDoS attacks. The rate limiter is configured with the following defaults:

- **Window**: 1 minute
- **Max Requests**: 5 requests per IP address per window
- **Response Headers**: Rate limit information is automatically included in response headers

### Usage

Apply the rate limiter middleware to any route:

```typescript
import rateLimitter from "@/middlewares/RateLimitter";

router.get("/your-route", rateLimitter, yourController);
```

### Customization

You can customize the rate limiter by modifying `src/middlewares/RateLimitter.ts`:

- Adjust `windowMs` to change the time window
- Modify `max` to change the maximum number of requests
- Customize the error message
- Configure additional options as needed

## Security Considerations

1. **Never commit `.env` files** - Add `.env` to `.gitignore`
2. **Use strong secrets** - Generate cryptographically secure secrets
3. **HTTPS in production** - Always use HTTPS in production environments
4. **Rotate secrets** - Regularly rotate JWE secrets
5. **Monitor token expiration** - Configure appropriate expiration times
6. **Configure rate limits** - Adjust rate limiting thresholds based on your application's needs

## License

ISC

## Author

saeed poureshghi

## Homepage

https://saeedpoureshghi.dev

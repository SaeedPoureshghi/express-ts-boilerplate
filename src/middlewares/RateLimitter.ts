import { rateLimit } from "express-rate-limit";

const rateLimitter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  headers: true,
});

export default rateLimitter;

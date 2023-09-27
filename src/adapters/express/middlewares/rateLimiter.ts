import { rateLimit } from "express-rate-limit";

const { MAX_REQUESTS = "5", TIME_MAX_REQUESTS_SECONDS = "60" } = process.env;
export const rateLimiter = rateLimit({
  windowMs: Number(TIME_MAX_REQUESTS_SECONDS) * 1000,
  max: Number(MAX_REQUESTS),
  message: `You have exceeded your ${MAX_REQUESTS} requests per ${TIME_MAX_REQUESTS_SECONDS} seconds limit.`,
  headers: true,
});

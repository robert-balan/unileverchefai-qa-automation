import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create and export the logger
export const logger = createLogger({
  level: "debug", // Default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize({ all: true }), // Colorize log output
    logFormat, // Use custom log format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({
      filename: "logs/app.log",
    }), // Log to file
  ],
});

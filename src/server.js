import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";
import response from "./utils/response.js";
import { NotFoundError, BadRequestError } from "./utils/errors.js";

//settings
const app = express();
app.set("PORT", process.env.PORT || 5000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/api/v1", mainRouter);

// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError("The requested URL was not found on this server."));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  let errorData = err.message;

  if (err instanceof BadRequestError) {
    errorData = err.data; // This will be the array of messages
  } else {
    errorData = err.message; // For other errors, it's a single string
  }

  response.error(res, errorData, statusCode, message);
});

export default app;

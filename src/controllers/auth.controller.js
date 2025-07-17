import { generateToken } from "../utils/jwt.js";
import response from "../utils/response.js";
import { UnauthorizedError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";

const default_user = {
  id: 1,
  email: "admin@admin.com",
  password: "password123",
};

const login = async (_, res) => {
  const { email, password } = res.locals.credential;

  if (email !== default_user.email || password !== default_user.password) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = generateToken({ id: default_user.id, email });
  
  response.success(res, { token }, 200, "Login successful");
};

export default {
  login: asyncHandler(login),
};

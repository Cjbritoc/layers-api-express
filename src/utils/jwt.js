import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables. Please check your .env file.');
}

/**
 * Generates a JSON Web Token.
 * @param {object} payload - The payload to include in the token.
 * @param {string|number} expiresIn - The expiration time for the token (e.g., '1h', '7d').
 * @returns {string} The generated token.
 */
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verifies a JSON Web Token.
 * @param {string} token - The token to verify.
 * @returns {object} The decoded payload if the token is valid.
 * @throws {Error} If the token is invalid or expired.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

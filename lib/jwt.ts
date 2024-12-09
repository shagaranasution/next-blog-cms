import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Generate a JWT token
 * @param payload - Data to include in the token
 * @param expiresIn - Token expiration time (default: 1h)
 * @returns Token string
 */
export const generateToken = (payload: object, expiresIn: string = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param token - Token to verify
 * @returns Decoded payload if valid, or throws an error
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

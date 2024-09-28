// src/utils/auth.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  userId: string;
  email: string;
}

export const authUtils = {
  /**
   * Hash a password using bcrypt
   * @param password - The plain text password to hash
   * @returns A promise that resolves to the hashed password
   */

  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  /**
   * Compare a plain text password with a hashed password
   * @param password - The plain text password to check
   * @param hashedPassword - The hashed password to compare against
   * @returns A promise that resolves to true if the passwords match, false otherwise
   */
  comparePassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  },

  /**
   * Generate a JWT token
   * @param payload - The data to be included in the token
   * @param expiresIn - The expiration time for the token (e.g., '1h', '7d')
   * @returns The generated JWT token
   */
  generateToken: (payload: TokenPayload, expiresIn: string = '1d'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  },

  /**
   * Verify and decode a JWT token
   * @param token - The JWT token to verify and decode
   * @returns The decoded token payload if valid, null otherwise
   */
  verifyToken: (token: string): TokenPayload | null => {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
};
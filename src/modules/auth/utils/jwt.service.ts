import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class JWTService {
  constructor() {}

  generateAccessToken(payload: { userId; email }, expiresIn: string) {
    return jwt.sign(payload, `${process.env.AUTH_KEY}`, {
      expiresIn: expiresIn,
    });
  }

  generateRefreshToken(payload: { userId }, expiresIn: string) {
    return jwt.sign(payload, `${process.env.AUTH_KEY}`, {
      expiresIn: expiresIn,
    });
  }

  verifyToken(refreshToken: string) {
    return jwt.verify(refreshToken, `${process.env.AUTH_KEY}`);
  }
}
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class JWTService {
  constructor() {}

  generateAccessToken(payload: { userId; email }, expiresIn: string) {
    return jwt.sign(payload, `${process.env.DB_CONN_STRING}`, {
      expiresIn: expiresIn,
    });
  }

  generateRefreshToken(payload: { userId }, expiresIn: string) {
    return jwt.sign(payload, `${process.env.DB_CONN_STRING}`, {
      expiresIn: expiresIn,
    });
  }

  verifyToken(refreshToken: string) {
    return jwt.verify(refreshToken, `${process.env.DB_CONN_STRING}`);
  }
}
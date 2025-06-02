import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'secret';

  sign(payload: object): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  verify(token: string): any {
    return jwt.verify(token, this.jwtSecret);
  }
}

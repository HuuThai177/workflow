import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy {
  async validate(payload: JwtPayload) {
    // Khung hàm validate payload lấy từ JWT Token
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

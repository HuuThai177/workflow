import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy {
  constructor(private readonly authService: AuthService) {}

  async validate(email: string, pass: string) {
    // Khung hàm validate credential khi đăng nhập
    return this.authService.validateUser(email, pass);
  }
}

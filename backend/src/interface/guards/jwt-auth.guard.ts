import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@/infrastructure/providers/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}

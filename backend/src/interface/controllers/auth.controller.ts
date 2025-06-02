import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@/application/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '@/application/use-cases/auth/login-user.usecase';
import { RegisterDto, LoginDto } from '../dto/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const res = await this.registerUserUseCase.execute(dto);
      return { message: 'User registered successfully', user: res.user, token: res.token };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const { token, user } = await this.loginUserUseCase.execute(dto);
      return { token, user };
    } catch (err) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}

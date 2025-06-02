import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@/application/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '@/application/use-cases/auth/login-user.usecase';
import { RegisterDto, LoginDto, AuthResponseDto } from '../dto/auth/auth.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiValidationErrorResponse } from '@/common/api-validation-error-decorator.decorator';

@ApiValidationErrorResponse()
@Controller('auth')
export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: AuthResponseDto })
  async register(@Body() dto: RegisterDto) {
    try {
      const res = await this.registerUserUseCase.execute(dto);
      return { user: res.user, token: res.token };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: 'Invalid credentials'  })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() dto: LoginDto) {
    try {
      const { token, user } = await this.loginUserUseCase.execute(dto);
      return { token, user };
    } catch (err) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}

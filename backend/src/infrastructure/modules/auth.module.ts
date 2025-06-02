import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from '@/interface/controllers/auth.controller';

import { RegisterUserUseCase } from '@/application/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '@/application/use-cases/auth/login-user.usecase';

import { UserRepositoryImpl } from '@/infrastructure/repositories/user.repository.impl';
import { UserModel, UserSchema } from '@/infrastructure/database/schemas/user.schema';
import { JwtService } from '@/infrastructure/providers/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [
    // Repositorio
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    // UseCases
    {
      provide: RegisterUserUseCase,
      useFactory: (repo, jwt) => new RegisterUserUseCase(repo, jwt),
      inject: ['UserRepository', JwtService],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (repo, jwt) => new LoginUserUseCase(repo, jwt),
      inject: ['UserRepository', JwtService],
    },
    JwtService,
  ],
  exports: ['UserRepository', JwtService],
})
export class AuthModule {}

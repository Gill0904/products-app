import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsObject, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class AuthResponseDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsObject()
  user: UserDto;
}
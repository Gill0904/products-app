import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ProductStatus } from '@/domain/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

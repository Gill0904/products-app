import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ProductStatus } from '@/domain/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

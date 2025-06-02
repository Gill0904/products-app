import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductStatus } from '@/domain/entities/product.entity';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}

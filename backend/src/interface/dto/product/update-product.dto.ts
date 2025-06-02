import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductStatus } from '@/domain/entities/product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}

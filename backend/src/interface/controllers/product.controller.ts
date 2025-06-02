import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateProductUseCase } from '@/application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from '@/application/use-cases/product/get-products.usecase';
import { UpdateProductUseCase } from '@/application/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from '@/application/use-cases/product/delete-product.usecase';
import { CreateProductDto } from '@/interface/dto/product/create-product.dto';
import { UpdateProductDto } from '@/interface/dto/product/update-product.dto';
import { JwtAuthGuard } from '@/interface/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto, @Request() req) {
    return this.createProductUseCase.execute({ ...dto, userId: req.user.userId });
  }

  @Get()
  findAll(@Request() req) {
    return this.getProductsUseCase.execute(req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}

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
  HttpCode,
} from '@nestjs/common';
import { CreateProductUseCase } from '@/application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from '@/application/use-cases/product/get-products.usecase';
import { UpdateProductUseCase } from '@/application/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from '@/application/use-cases/product/delete-product.usecase';
import { CreateProductDto } from '@/interface/dto/product/create-product.dto';
import { UpdateProductDto } from '@/interface/dto/product/update-product.dto';
import { JwtAuthGuard } from '@/interface/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from '../dto/product/product.dto';
import { ApiValidationErrorResponse } from '@/common/api-validation-error-decorator.decorator';

@ApiTags('products')
@ApiBearerAuth()
@ApiValidationErrorResponse()
@ApiForbiddenResponse({ description: 'Sin autorización' })
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
  @ApiCreatedResponse({ type: ProductDto })
  create(@Body() dto: CreateProductDto, @Request() req) {
    return this.createProductUseCase.execute({ ...dto, userId: req.user.userId });
  }

  @Get()
  @ApiOkResponse({ type: ProductDto, isArray: true })
  findAll(@Request() req) {
    return this.getProductsUseCase.execute(req.user.userId);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductDto })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Producto eliminado' })
  delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from '@/interface/controllers/product.controller';
import { ProductModel, ProductSchema } from '@/infrastructure/database/schemas/product.schema';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository.impl';

import { CreateProductUseCase } from '@/application/use-cases/product/create-product.usecase';
import { GetAllProductsUseCase } from '@/application/use-cases/product/get-products.usecase';
import { DeleteProductUseCase } from '@/application/use-cases/product/delete-product.usecase';
import { UpdateProductUseCase } from '@/application/use-cases/product/update-product.usecase';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [
    // Repositorio
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    // UseCases
    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: GetAllProductsUseCase,
      useFactory: (repo) => new GetAllProductsUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo) => new UpdateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo) => new DeleteProductUseCase(repo),
      inject: ['ProductRepository'],
    },
  ],
  exports: ['ProductRepository'],
})
export class ProductsModule {}

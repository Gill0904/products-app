import { Injectable } from '@nestjs/common';
import { Product, ProductStatus } from '@/domain/entities/product.entity';
import { ProductRepository } from '@/domain/ports/product.repository.port';

interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  userId: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const product = new Product(
      '', // id lo genera Mongo
      data.name,
      data.description,
      data.price,
      data.status,
      data.userId,
      new Date(),
    );

    return this.productRepository.create(product);
  }
}

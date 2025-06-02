import { Injectable } from '@nestjs/common';
import { Product } from '@/domain/entities/product.entity';
import { ProductRepository } from '@/domain/ports/product.repository.port';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(userId: string): Promise<Product[]> {
    return this.productRepository.findAllByUser(userId);
  }
}

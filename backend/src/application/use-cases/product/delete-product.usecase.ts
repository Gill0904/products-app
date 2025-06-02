import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@/domain/ports/product.repository.port';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
  }
}

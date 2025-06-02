import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@/domain/ports/product.repository.port';
import { Product, ProductStatus } from '@/domain/entities/product.entity';

interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  status?: ProductStatus;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = { ...product, ...data, updatedAt: new Date() };
    return this.productRepository.update(id, updatedProduct);
  }
}

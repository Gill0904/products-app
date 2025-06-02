import { Product } from '@/domain/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAllByUser(userId: string): Promise<Product[]>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Product | null>;
}

import { Product } from '@/domain/entities/product.entity';
import { ProductDocument } from '@/infrastructure/database/schemas/product.schema';

export const mapToProduct = (doc: ProductDocument): Product => {
  if (!doc) {
    throw new Error('Document is null or undefined');
  }

  return {
    id: doc._id ? doc._id.toString() : '',
    name: doc.name,
    description: doc.description,
    price: doc.price,
    status: doc.status,
    userId: doc.userId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
};

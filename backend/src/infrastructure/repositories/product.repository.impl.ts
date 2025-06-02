import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@/domain/ports/product.repository.port';
import { Product } from '@/domain/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, ProductModel } from '@/infrastructure/database/schemas/product.schema';
import { mapToProduct } from '@/infrastructure/mappers/product.mapper';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectModel('product') private readonly productModel: Model<ProductDocument>,
  ) {}

    async findById(id: string): Promise<Product | null> {
        const doc = await this.productModel.findById(id).exec();
        return doc? mapToProduct(doc) : null;
    }
    async create(product: Product): Promise<Product> {
        const created = new this.productModel(product);
        const saved = await created.save();
        return mapToProduct(saved);
    }

    async findAllByUser(userId: string): Promise<Product[]> {
        const docs = await this.productModel.find({ userId }).exec();
        return docs.map(mapToProduct);
    }

    async update(id: string, product: Partial<Product>): Promise<Product> {
        const updated = await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
        if(!updated){
            throw new NotFoundException('Product not found');
        }
        return mapToProduct(updated);
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}

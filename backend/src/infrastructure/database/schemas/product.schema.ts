import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductStatus } from '@/domain/entities/product.entity';

@Schema({ timestamps: true })
export class ProductModel {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true, min: 0 }) price: number;
  @Prop({ enum: ProductStatus, required: true }) status: ProductStatus;
  @Prop({ required: true }) userId: string;
  @Prop({ required: false }) createdAt: Date;
  @Prop({ required: false }) updatedAt: Date;
}

export type ProductDocument = ProductModel & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductModel);

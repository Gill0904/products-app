import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/infrastructure/modules/auth.module';
import { ProductsModule } from '@/infrastructure/modules/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}

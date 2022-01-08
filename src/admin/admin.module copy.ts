import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminProductsController } from './admin.products.controller';
import { ProductsService } from '../models/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AdminController, AdminProductsController],
  providers: [ProductsService],
})
export class AdminModule {}

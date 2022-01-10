import { Controller, Get, Render, Post, Body, Redirect, 
  ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../models/products.service';
import { Product } from '../models/product.entity';
import { CreateProductDto } from '../dto/create.product.dto';

@Controller('/admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: "./public/uploads" }))
  @Redirect('/admin/products')
  async store(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const newProduct = new Product();
    newProduct.setName(createProductDto.name);
    newProduct.setDescription(createProductDto.description);
    newProduct.setPrice(createProductDto.price);
    newProduct.setImage(file.filename);
    await this.productsService.create(newProduct);
  }
}

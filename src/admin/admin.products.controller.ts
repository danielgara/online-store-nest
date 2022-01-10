import { Controller, Get, Render, Post, Body, Redirect, 
  ValidationPipe, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
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
    await this.productsService.createOrUpdate(newProduct);
  }

  @Post('/:id')
  @Redirect('/admin/products')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: "./public/uploads" }))
  @Redirect('/admin/products')
  async upload(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const product = await this.productsService.findOne(id);
    product.setName(createProductDto.name);
    product.setDescription(createProductDto.description);
    product.setPrice(createProductDto.price);
    if(file){
      product.setImage(file.filename);
    }
    await this.productsService.createOrUpdate(product);
  }
}

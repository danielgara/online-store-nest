import { Controller, Get, Render, Post, Body, Redirect } from '@nestjs/common';
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
  @Redirect('/admin/products')
  async store(@Body() createProductDto: CreateProductDto) {
    const newProduct = new Product();
    newProduct.setName(createProductDto.name);
    newProduct.setDescription(createProductDto.description);
    newProduct.setPrice(createProductDto.price);
    newProduct.setImage('game.png');
    await this.productsService.create(newProduct);
  }
}

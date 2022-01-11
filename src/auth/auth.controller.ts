import { Controller, Get, Render, Post, Redirect,
  ValidationPipe, Body } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UsersService } from '../models/users.service';
import { CreateUserDto } from '../dto/create.user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/register')
  @Render('auth/register')
  register() {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    return {
      viewData: viewData,
    };
  }

  @Post('/store')
  @Redirect('/')
  async store(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.setName(createUserDto.name);
    newUser.setPassword(createUserDto.password);
    newUser.setEmail(createUserDto.email);
    newUser.setRole('client');
    newUser.setBalance(1000);
    await this.usersService.createOrUpdate(newUser);
  }
}

/*@Get('/login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'Auth - Login - Online Store';
    return {
      viewData: viewData,
    };
  }*/

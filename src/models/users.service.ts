import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrUpdate(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.getPassword(), 10);
    user.setPassword(hash);
    return this.usersRepository.save(user);
  }

  /*findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }*/
}

/*import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from 'src/users/user.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async login(payload: UserDto): Promise<UserDto> {
    const user = await this.usersService.findByUsername(payload.username);
    if (!user) throw new Error('User is not registered');
    const match = await bcrypt.compare(payload.password, user.password);
    if (!match) throw new Error('Invalid username or password');
    return user;
  }
}
*/

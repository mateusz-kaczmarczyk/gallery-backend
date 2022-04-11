import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe() {
    return this.userService.getMe();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: UpdateUserDto) {
    return this.userService.update(dto);
  }

}

import { Body, Controller, Get, Post, Query, UseGuards, Param, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Picture } from 'src/entity/picture.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PictureOwnerGuard } from './guard/picture-owner.guard';
import { PictureService } from './picture.service';

@Controller('pictures')
export class PictureController {

  constructor(
    private readonly pictureSerivce: PictureService, 
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePictureDto): Promise<Picture> {
    return this.pictureSerivce.createPicture(dto);
  }

  @Get()
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  async getByUsername(
    @Query('user') username: string,
  ): Promise<Picture[]> {
    return this.pictureSerivce.getByUsername(username);
  }

  @Get('public')
  async getAllPublic(): Promise<Picture[]> {
    return this.pictureSerivce.getAllPublic();
  }

  @Get('search')
  async searchByTags(
    @Query('tags') tags: string
  ): Promise<Picture[]> {
    return this.pictureSerivce.searchByTags(tags);
  }

  @Get(':id')
  async getById(
    @Param('id') id: number,
  ): Promise<Picture> {
    return this.pictureSerivce.getById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PictureOwnerGuard)
  async remove(
    @Param('id') id: number,
  ): Promise<void> {
    await this.pictureSerivce.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PictureOwnerGuard)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdatePictureDto,
  ): Promise<Picture> {
    return this.pictureSerivce.update(id, dto);
  }

}

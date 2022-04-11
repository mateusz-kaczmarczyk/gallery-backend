import { Body, Controller, Delete, Post, Query, UseGuards } from '@nestjs/common';
import { Like } from 'src/entity/like.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateLikeDto } from './dto/create-like.dto';
import { PictureAlreadyLikedGuard } from './guard/already-liked.guard';
import { PictureIsNotLikedGuard } from './guard/not-liked.guard';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {

  constructor(
    private readonly likeService: LikeService, 
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard, PictureAlreadyLikedGuard)
  async like(
    @Body() dto: CreateLikeDto,
  ): Promise<Like> {
    return this.likeService.create(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, PictureIsNotLikedGuard)
  async dislike(
    @Query('picture') pictureId: number,
  ): Promise<void> {
    return this.likeService.remove(pictureId);
  }

}

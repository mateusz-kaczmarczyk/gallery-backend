import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Comment } from 'src/entity/comment.entity';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {

  constructor(
    private readonly commentService: CommentService, 
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(dto);
  }

  @Get()
  async getByPicture(
    @Query('picture') pictureId: number,
  ): Promise<Comment[]> {
    return this.commentService.getByPicture(pictureId);
  }

}

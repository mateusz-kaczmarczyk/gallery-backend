import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/auth/authenticated-request';
import { Comment } from 'src/entity/comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
  ) { }

  async create(dto: CreateCommentDto): Promise<CommentDto> {
    const user = this.request.user;
    const comment = await this.commentRepository.save(this.commentRepository.create({
      ...dto,
      userId: user.id,
    }));
    return { ...comment, user };
  }

  async getByPicture(pictureId: number): Promise<Comment[]> {
    return this.commentRepository.findAllByPictureId(pictureId);
  }

}

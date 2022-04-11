import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/auth/authenticated-request';
import { Like } from 'src/entity/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {

  constructor(
    private readonly likeRepository: LikeRepository,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
  ) { }

  async create(dto: CreateLikeDto): Promise<Like> {
    return this.likeRepository.save(this.likeRepository.create({
      ...dto,
      userId: this.request.user.id,
    }));
  }

  async remove(pictureId: number): Promise<void> {
    await this.likeRepository.delete({
      userId: this.request.user.id,
      pictureId,
    });
  }

}

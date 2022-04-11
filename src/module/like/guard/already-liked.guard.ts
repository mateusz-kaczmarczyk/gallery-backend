import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { LikeRepository } from '../like.repository';

@Injectable()
export class PictureAlreadyLikedGuard implements CanActivate {
  
  constructor(
    private readonly likeRepository: LikeRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const pictureId = request.body.pictureId;
    const userId = request.user.id;
    const like = await this.likeRepository.findOneByPictureIdAndUserId(pictureId, userId);
    if (like) {
      throw new HttpException({
        statusCode: 409,
        message: 'Picture already liked'
      }, HttpStatus.CONFLICT);
    }
    return true;
  }
}

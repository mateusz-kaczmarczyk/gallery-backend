import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { LikeRepository } from '../like.repository';

@Injectable()
export class PictureIsNotLikedGuard implements CanActivate {

  constructor(
    private readonly likeRepository: LikeRepository,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const pictureId = request.query.picture;
    const userId = request.user.id;
    const like = await this.likeRepository.findOneByPictureIdAndUserId(pictureId, userId);
    if (!like) {
      throw new HttpException({
        statusCode: 422,
        message: 'Picture has to be liked before disliking'
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return true;
  }
}

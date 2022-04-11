import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PictureService } from '../picture.service';

@Injectable()
export class PictureOwnerGuard implements CanActivate {
  
  constructor(
    private readonly pictureService: PictureService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const pictureId = request.params.id;
    const userId = request.user.id;
    return this.pictureService.isPictureOwner(pictureId, userId);
  }
}

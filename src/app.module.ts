import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database/database.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { AwsModule } from './module/aws/aws.module';
import { PictureModule } from './module/picture/picture.module';
import { TagModule } from './module/tag/tag.module';
import { CommentModule } from './module/comment/comment.module';
import { LikeModule } from './module/like/like.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    AwsModule,
    PictureModule,
    TagModule,
    CommentModule,
    LikeModule,
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { CommentModule } from '../comment/comment.module';
import { TagModule } from '../tag/tag.module';
import { PictureController } from './picture.controller';
import { PictureRepository } from './picture.repository';
import { PictureService } from './picture.service';
import { PictureExistConstraint } from './validator/picture-exist.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([PictureRepository]),
    AwsModule,
    TagModule,
    CommentModule,
  ],
  controllers: [PictureController],
  providers: [PictureService, PictureExistConstraint],
  exports: [TypeOrmModule, PictureService]
})
export class PictureModule {}

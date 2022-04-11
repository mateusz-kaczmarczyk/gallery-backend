import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/auth/authenticated-request';
import { Picture } from 'src/entity/picture.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UploadImageDto } from '../aws/dto/upload-image.dto';
import { S3Service } from '../aws/s3.service';
import { TagService } from '../tag/tag.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PictureRepository } from './picture.repository';

@Injectable({ scope: Scope.REQUEST })
export class PictureService {

  constructor(
    private readonly s3Service: S3Service,
    private readonly pictureRepository: PictureRepository,
    private readonly tagService: TagService,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
  ) { }

  @Transactional()
  async createPicture(dto: CreatePictureDto): Promise<Picture> {
    let picturePath: string;
    try {
      const imageBase64 = Buffer.from(dto.data, 'base64');
      picturePath = await this.s3Service.uploadPicture(new UploadImageDto({
        imageBase64,
        extension: dto.extension
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
    const tags = await this.tagService.bulkFindOrCreate(dto.tags);
    return this.pictureRepository.save(this.pictureRepository.create({
      ...dto,
      userId: this.request.user.id,
      path: picturePath,
      private: dto.private ? true : false,
      tags: tags
    }));
  }

  async getByUsername(username: string): Promise<Picture[]> {
    let includePrivatePictures = false;
    if (this.request.user && this.request.user.username === username) {
      includePrivatePictures = true;
    }
    return this.pictureRepository.findAllByUsername(username, includePrivatePictures);
  }

  async getAllPublic(): Promise<Picture[]> {
    return this.pictureRepository.findAllPublic();
  }

  async getById(id: number): Promise<Picture> {
    return this.pictureRepository.findOneById(id);
  }

  async searchByTags(tagsString: string): Promise<Picture[]> {
    const tags = tagsString.split(' ');
    return this.pictureRepository.findAllByTags(tags);
  }

  async isPictureOwner(pictureId: number, userId: number): Promise<boolean> {
    const picture = await this.pictureRepository.findOne(pictureId);
    return picture.userId === userId;
  }

  async remove(id: number): Promise<void> {
    await this.pictureRepository.delete({ id: id });
  }

  @Transactional()
  async update(id: number, dto: UpdatePictureDto): Promise<Picture> {
    const picture = await this.pictureRepository.findOne(id);
    const tags = await this.tagService.bulkFindOrCreate(dto.tags);
    return this.pictureRepository.save({
      ...picture,
      tags,
      private: dto.private || picture.private,
    });
  }

}

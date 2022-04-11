import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/auth/authenticated-request';
import { User } from 'src/entity/user.entity';
import { UploadImageDto } from '../aws/dto/upload-image.dto';
import { S3Service } from '../aws/s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable({ scope: Scope.REQUEST })
export class UserService {

  constructor(
    private readonly s3Service: S3Service,
    private readonly userRepository: UserRepository,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
  ) { }

  create(dto: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(dto));
  }

  async getMe(): Promise<User> {
    return this.request.user;
  }

  async update(dto: UpdateUserDto): Promise<User> {
    let picturePath: string;
    try {
      const imageBase64 = Buffer.from(dto.avatarData, 'base64');
      picturePath = await this.s3Service.uploadPicture(new UploadImageDto({
        imageBase64,
        extension: dto.extension,
        path: 'avatars'
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
    this.request.user.avatar = picturePath;
    return this.userRepository.save(this.request.user);
  }



}

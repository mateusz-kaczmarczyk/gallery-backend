import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class S3Service {

  private s3client: S3Client;
  private readonly filepathBase: string;

  constructor() {
    this.s3client = new S3Client({ region: process.env.AWS_REGION });
    this.filepathBase = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
  }

  async uploadPicture(dto: UploadImageDto) {
    const pictureKey = `${dto.path}/${dto.filename}.${dto.extension}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: pictureKey,
      Body: dto.imageBase64
    };
    try {
      await this.s3client.send(new PutObjectCommand(uploadParams));
    } catch (error) {
      throw error;
    }
    return `${this.filepathBase}${pictureKey}`;
  }

}

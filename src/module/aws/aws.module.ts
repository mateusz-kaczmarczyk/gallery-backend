import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { S3Service } from './s3.service';

@Module({
  providers: [
    S3Service,
    CognitoService,
  ],
  exports: [
    S3Service,
    CognitoService,
  ]
})
export class AwsModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EmailExistValidator } from './validator/email-exist.validator';
import { UsernameExistValidator } from './validator/username-exist.validator';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AwsModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailExistValidator, UsernameExistValidator],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }

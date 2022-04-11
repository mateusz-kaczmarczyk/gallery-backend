import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AwsModule } from '../aws/aws.module';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AnonymousStrategy } from './strategy/anonymous.strategy';
import { AnonymousAuthGuard } from './guard/anonymous.guard';

@Module({
  imports: [AwsModule, UserModule],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    AnonymousStrategy,
    AnonymousAuthGuard,
  ],
  controllers: [AuthController],
  exports: [
    JwtAuthGuard,
    AnonymousAuthGuard,
  ]
})
export class AuthModule { }

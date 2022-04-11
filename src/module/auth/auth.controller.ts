import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<any> {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @HttpCode(200)  
  async login(@Body() dto: LoginDto): Promise<CognitoIdToken> {
    return this.authService.login(dto); 
  }

}

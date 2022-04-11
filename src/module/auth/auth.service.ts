import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import { HttpResponse } from 'aws-sdk';
import { CognitoService } from '../aws/cognito.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly cognitoService: CognitoService,
    private readonly userService: UserService,
  ) { }

  async signUp(dto: SignUpDto) {
    let cognitoId: string;
    try {
      cognitoId = await this.cognitoService.createUser(dto.username, dto.email, dto.password);
    } catch (error) {
      if (!error.code) {
        throw error;
      }
      let field: string;
      switch (error.code) {
        case 'UsernameExistsException':
          field = 'email'
          break;
        case 'InvalidPasswordException':
          field = 'password'
          break;
        default:
          break;
      }
      throw new HttpException({
        statusCode: 422,
        message: error.message,
        field: field
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const userDto: CreateUserDto = { ...dto, cognitoId };
    await this.userService.create(userDto);
    return new HttpResponse();
  }

  async login(dto: LoginDto): Promise<CognitoIdToken> {
    let idToken: CognitoIdToken;
    try {
      idToken = await this.cognitoService.authenticate(dto.username, dto.password);
    } catch (error) {
      throw new HttpException({
        statusCode: 422,
        message: error.message,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return idToken;
  }

}

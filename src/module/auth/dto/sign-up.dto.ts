import { IsEmail, IsNotEmpty } from "class-validator";
import { EmailExist } from "src/module/user/validator/email-exist.validator";
import { UsernameExist } from "src/module/user/validator/username-exist.validator";

export class SignUpDto {

  @IsNotEmpty()
  firstName: string;
  
  @IsNotEmpty()
  lastName: string;
  
  @UsernameExist({ message: 'An account with the given username already exists.' })
  @IsNotEmpty()
  username: string;
  
  @EmailExist({ message: 'An account with the given email already exists.' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  
}

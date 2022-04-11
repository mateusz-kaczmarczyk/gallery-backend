import { SignUpDto } from "src/module/auth/dto/sign-up.dto";

export class CreateUserDto extends SignUpDto {

  cognitoId: string;

}

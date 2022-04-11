import { IsNotEmpty } from "class-validator"

export class UpdateUserDto {

  @IsNotEmpty()
  avatarData: string

  @IsNotEmpty()
  extension: string

}

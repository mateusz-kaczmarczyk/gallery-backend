import { ArrayUnique, IsArray, IsIn, IsNotEmpty } from "class-validator"

export class CreatePictureDto {

  @IsIn([true, false])
  private: boolean

  @IsNotEmpty()
  data: string

  @IsNotEmpty()
  extension: string

  @ArrayUnique<string>()
  @IsNotEmpty({ each: true })
  @IsArray()
  tags: string[]

}

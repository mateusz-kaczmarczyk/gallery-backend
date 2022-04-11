import { ArrayUnique, IsArray, IsIn, IsNotEmpty, IsOptional } from "class-validator"

export class UpdatePictureDto {

  @IsIn([true, false])
  @IsOptional()
  private?: boolean

  @ArrayUnique<string>()
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[]

}

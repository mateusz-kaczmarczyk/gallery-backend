import { IsNotEmpty } from "class-validator";
import { PictureExist } from "src/module/picture/validator/picture-exist.validator";

export class CreateCommentDto {

  @PictureExist()
  @IsNotEmpty()
  pictureId: number;

  @IsNotEmpty()
  content: string;

}

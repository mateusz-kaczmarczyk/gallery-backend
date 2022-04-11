import { IsNotEmpty } from "class-validator";
import { PictureExist } from "src/module/picture/validator/picture-exist.validator";

export class CreateLikeDto {

  @PictureExist()
  @IsNotEmpty()
  pictureId: number;

}

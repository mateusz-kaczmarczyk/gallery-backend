import { User } from "src/entity/user.entity"

export interface CommentDto {
  pictureId: number
  content: string
  user: User
}

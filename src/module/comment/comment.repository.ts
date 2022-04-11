import { Comment } from "src/entity/comment.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  async findAllByPictureId(pictureId: number): Promise<Comment[]> {
    const qb = this.createQueryBuilder('c')
      .innerJoin('c.picture', 'p')
      .innerJoinAndSelect('c.user', 'u')
      .where('p.id = :pictureId', { pictureId })
    return qb.getMany();
  }

}

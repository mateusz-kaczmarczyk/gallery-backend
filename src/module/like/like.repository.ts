import { Like } from "src/entity/like.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {

  async findOneByPictureIdAndUserId(pictureId: number, userId: number): Promise<Like> {
    const qb = this.createQueryBuilder('l')
      .where('l.pictureId = :pictureId', { pictureId })
      .andWhere('l.userId = :userId', { userId })
    return qb.getOne();
  }

}

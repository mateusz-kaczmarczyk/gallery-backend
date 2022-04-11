import { Picture } from "src/entity/picture.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {

  async findAllByUsername(username: string, includePrivate: boolean = false): Promise<Picture[]> {
    const qb = this.createQueryBuilder('p')
      .innerJoin('p.user', 'u')
      .leftJoinAndSelect('p.tags', 't')
      .where('u.username = :username', { username })
      .andWhere('p.private = false')
    if (includePrivate) {
      qb.orWhere('p.private = true')
    }
    return qb.getMany();
  }

  async findAllPublic(): Promise<Picture[]> {
    const qb = this.createQueryBuilder('p')
      .where('p.private = false')
    return qb.getMany();
  }

  async findOneById(id: number) {
    const qb = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .leftJoinAndSelect('p.tags', 't')
      .leftJoinAndSelect('p.likes', 'l')
      .select(['p', 'u.id', 'u.username', 't', 'l'])
      .where('p.id = :id', { id })
    return qb.getOne();
  }

  async findAllByTags(tags: string[]) {
    const qb = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.tags', 't')
      .where('t.name = ANY (:tags)', { tags })
    return qb.getMany();
  }

}

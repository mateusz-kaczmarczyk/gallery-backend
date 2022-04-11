import { Tag } from "src/entity/tag.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

}

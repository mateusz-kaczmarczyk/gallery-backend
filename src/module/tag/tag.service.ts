import { Injectable } from '@nestjs/common';
import { Tag } from 'src/entity/tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {

  constructor(
    private readonly tagRepository: TagRepository,
  ) { }

  async findOrCreate(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { name }
    });
    if (tag) return tag;
    return this.tagRepository.save(this.tagRepository.create({ name: name }));
  }

  async bulkFindOrCreate(dtos: string[]): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const dto of dtos) {
      const result = await this.findOrCreate(dto);
      if (result) {
        tags.push(result);
      }
    }
    return tags;
  }

}

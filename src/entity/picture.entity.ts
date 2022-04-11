import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

@Entity('pictures')
export class Picture {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  private: boolean;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  extension: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'pictures_tags',
    joinColumn: {
      name: 'picture_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    }
  })
  tags: Tag[]

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, c => c.picture)
  comments: Comment[];

  @OneToMany(() => Like, l => l.picture)
  likes: Like[];

}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "./picture.entity";
import { User } from "./user.entity";

@Entity('comments')
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  pictureId: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Picture, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  picture: Picture;

  @CreateDateColumn()
  createdAt: Date;

}

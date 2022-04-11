import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "./picture.entity";
import { User } from "./user.entity";

@Entity('likes')
export class Like {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  pictureId: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => Picture, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  picture: Picture;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

}

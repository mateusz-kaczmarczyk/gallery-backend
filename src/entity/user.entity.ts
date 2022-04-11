import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "./picture.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;
  
  @Column({ nullable: false, unique: true })
  cognitoId: string;

  @Column({ nullable: false, default: process.env.DEFAULT_AVATAR_URL })
  avatar: string

/////////////////////////////////////////

  @OneToMany(() => Picture, p => p.user)
  pictures?: Picture[];

}

import { User } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByCognitoId(cognitoId: string): Promise<User> {
    return this.findOne({
      where: { cognitoId }
    })
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email }
    })
  }

  async findByUsername(username: string): Promise<User> {
    return this.findOne({
      where: { username }
    })
  }

}

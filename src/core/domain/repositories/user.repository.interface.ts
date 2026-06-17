import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByIds(id1: string, id2: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

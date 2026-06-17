import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/domain/entities/user.entity';
import type { IUserRepository } from 'src/core/domain/repositories/user.repository.interface';
import type { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByIds(id1: string, id2: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id1, id2 },
    });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

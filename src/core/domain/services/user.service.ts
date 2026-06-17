import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: IUserRepository,
  ) {}

  async findByIds(id1: string, id2: string) {
    const existing = await this.repository.findByIds(id1, id2);

    if (existing) {
      return existing.id;
    }

    const user = User.create(id1, id2);

    await this.repository.save(user);

    return user.id;
  }
}

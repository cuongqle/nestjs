import { Inject, Injectable } from '@nestjs/common';
import type { IUserCacheRepository } from 'src/core/domain/repositories/user-cache.repository.interface';
import { UserService } from 'src/core/domain/services/user.service';

@Injectable()
export class UserAppService {
  constructor(
    @Inject('IUserCacheRepository')
    private readonly cache: IUserCacheRepository,
    private readonly service: UserService,
  ) {}

  async getUserByIds(id1: string, id2: string) {
    const cached = await this.cache.get(id1, id2);

    if (cached) {
      return cached;
    }

    const userId = await this.service.findByIds(id1, id2);

    await this.cache.set(id1, id2, userId);

    return userId;
  }
}

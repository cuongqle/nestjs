import { Injectable } from '@nestjs/common';
import type { IUserCacheRepository } from 'src/core/domain/repositories/user-cache.repository.interface';
import { RedisService } from './redis.service';

@Injectable()
export class UserCacheRepository implements IUserCacheRepository {
  constructor(private readonly redisService: RedisService) {}

  async get(id1: string, id2: string): Promise<string | null> {
    return this.redisService.get(this.buildKey(id1, id2));
  }

  async set(id1: string, id2: string, userId: string): Promise<void> {
    await this.redisService.set(this.buildKey(id1, id2), userId);
  }

  private buildKey(id1: string, id2: string): string {
    return `user:${id1}:${id2}`;
  }
}
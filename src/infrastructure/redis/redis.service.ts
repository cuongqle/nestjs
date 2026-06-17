import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;
  private static readonly TTL = 3600;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number = RedisService.TTL) {
    return this.redis.set(key, value, 'EX', ttl);
  }
}

import { Test } from '@nestjs/testing';
import { UserCacheRepository } from './user-cache.repository';
import { RedisService } from './redis.service';

describe('UserCacheRepository', () => {
  let repo: UserCacheRepository;
  let mockRedisService: any;

  beforeEach(async () => {
    mockRedisService = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: RedisService, useValue: mockRedisService },
        UserCacheRepository,
      ],
    }).compile();

    repo = module.get(UserCacheRepository);
  });

  it('get should call redisService.get with correct key', async () => {
    mockRedisService.get.mockResolvedValue('cached-user-id');

    const result = await repo.get('a', 'b');

    expect(mockRedisService.get).toHaveBeenCalledWith('user:a:b');
    expect(result).toBe('cached-user-id');
  });

  it('get should return null when key not found', async () => {
    mockRedisService.get.mockResolvedValue(null);

    const result = await repo.get('x', 'y');

    expect(mockRedisService.get).toHaveBeenCalledWith('user:x:y');
    expect(result).toBeNull();
  });

  it('set should call redisService.set with correct key and value', async () => {
    mockRedisService.set.mockResolvedValue('OK');

    await repo.set('a', 'b', 'user-123');

    expect(mockRedisService.set).toHaveBeenCalledWith('user:a:b', 'user-123');
  });
});

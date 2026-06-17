import { RedisService } from './redis.service';

jest.mock('ioredis', () => {
  return jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  }));
});

describe('RedisService', () => {
  let service: RedisService;
  let mockRedisClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRedisClient = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const RedisMock = require('ioredis');
    RedisMock.mockImplementation(() => mockRedisClient);

    service = new RedisService();
  });

  it('get should call redis.get with the provided key', async () => {
    mockRedisClient.get.mockResolvedValue('cached-value');

    const result = await service.get('test-key');

    expect(mockRedisClient.get).toHaveBeenCalledWith('test-key');
    expect(result).toBe('cached-value');
  });

  it('get should return null when key does not exist', async () => {
    mockRedisClient.get.mockResolvedValue(null);

    const result = await service.get('non-existent-key');

    expect(mockRedisClient.get).toHaveBeenCalledWith('non-existent-key');
    expect(result).toBeNull();
  });

  it('set should call redis.set with key, value, and default TTL', async () => {
    mockRedisClient.set.mockResolvedValue('OK');

    await service.set('test-key', 'test-value');

    expect(mockRedisClient.set).toHaveBeenCalledWith('test-key', 'test-value', 'EX', 3600);
  });

  it('set should call redis.set with custom TTL when provided', async () => {
    mockRedisClient.set.mockResolvedValue('OK');

    await service.set('test-key', 'test-value', 7200);

    expect(mockRedisClient.set).toHaveBeenCalledWith('test-key', 'test-value', 'EX', 7200);
  });
});

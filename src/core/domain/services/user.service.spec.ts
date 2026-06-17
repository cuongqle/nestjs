import { Test } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: any;

  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn(),
      findByIds: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'IUserRepository', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('should find user by IDs correctly', async () => {
    mockUserRepository.findByIds.mockResolvedValue({ id: '1' });

    const userId = await service.findByIds('1', '2');

    expect(typeof userId).toBe('string');
  });
});

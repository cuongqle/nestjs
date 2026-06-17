import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/core/domain/entities/user.entity';

describe('UserRepository', () => {
  let repo: UserRepository;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(User), useValue: mockRepository },
        UserRepository,
      ],
    }).compile();

    repo = module.get(UserRepository);
  });

  it('findByIds should return a user when found', async () => {
    const expected = { id1: 'a', id2: 'b' } as User;
    mockRepository.findOne.mockResolvedValue(expected);

    const result = await repo.findByIds('a', 'b');

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id1: 'a', id2: 'b' } });
    expect(result).toBe(expected);
  });

  it('save should call repository.save and return saved entity', async () => {
    const entity = { id1: 'x', id2: 'y' } as User;
    mockRepository.save.mockResolvedValue(entity);

    const result = await repo.save(entity);

    expect(mockRepository.save).toHaveBeenCalledWith(entity);
    expect(result).toBe(entity);
  });
});

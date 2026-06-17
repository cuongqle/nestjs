import { Test } from '@nestjs/testing';
import { UserAppService } from './user.app-service';
import { UserService } from 'src/core/domain/services/user.service';

describe('UserAppService', () => {
	let service: UserAppService;
	let mockCacheRepo: any;
	let mockUserService: any;

	beforeEach(async () => {
		mockCacheRepo = {
			get: jest.fn(),
			set: jest.fn(),
		};

		mockUserService = {
			findByIds: jest.fn(),
		};

		const module = await Test.createTestingModule({
			providers: [
				{ provide: 'IUserCacheRepository', useValue: mockCacheRepo },
				{ provide: UserService, useValue: mockUserService },
        UserAppService,
			],
		}).compile();

		service = module.get(UserAppService);
	});

	it('returns cached value when present', async () => {
		mockCacheRepo.get.mockResolvedValue('cached-id');

		const result = await service.getUserByIds('1', '2');

		expect(result).toBe('cached-id');
		expect(mockUserService.findByIds).not.toHaveBeenCalled();
	});

	it('calls service and caches when not cached', async () => {
		mockCacheRepo.get.mockResolvedValue(null);
		mockUserService.findByIds.mockResolvedValue('fresh-id');

		const result = await service.getUserByIds('1', '2');

		expect(result).toBe('fresh-id');
		expect(mockUserService.findByIds).toHaveBeenCalledWith('1', '2');
		expect(mockCacheRepo.set).toHaveBeenCalledWith('1', '2', 'fresh-id');
	});
});


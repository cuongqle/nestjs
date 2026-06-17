import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { UserCacheRepository } from 'src/infrastructure/redis/user-cache.repository';
import { UserRepository } from 'src/infrastructure/persistence/repositories/user.repository';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { UserAppService } from 'src/application/users/user.app-service';
import { User } from 'src/core/domain/entities/user.entity';
import { UserService } from 'src/core/domain/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserCacheRepository',
      useClass: UserCacheRepository,
    },
    UserService,
    UserAppService,
    RedisService,
  ],
})
export class UserModule {}

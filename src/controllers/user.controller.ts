import { Body, Controller, Post } from '@nestjs/common';
import { GetUserDto } from 'src/application/users/dtos/get-user.dto';
import { UserAppService } from 'src/application/users/user.app-service';

@Controller('users')
export class UserController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post()
  async getUser(@Body() dto: GetUserDto): Promise<{ userId: string }> {
    const userId = await this.userAppService.getUserByIds(dto.id1, dto.id2);

    return {
      userId,
    };
  }
}

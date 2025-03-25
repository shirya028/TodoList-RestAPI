import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

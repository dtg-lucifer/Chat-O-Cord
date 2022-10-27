import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { Session, User } from 'src/utils/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [{
    provide: Services.USERS,
    useClass: UsersService
  }],
  controllers: [UsersController],
  exports: [{
    provide: Services.USERS,
    useClass: UsersService
  }]
})
export class UsersModule {}

/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from 'src/users/users';
import { Services } from '../../utils/constants';
import { User } from '../../utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user._id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
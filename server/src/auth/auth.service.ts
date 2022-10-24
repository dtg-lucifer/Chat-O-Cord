import { Injectable, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { IUserService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { compareHashedPassword } from 'src/utils/helpers';
import { ValidateUserCredentials } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {

    constructor(@Inject(Services.USERS) private readonly usersService: IUserService) { }

    async validateUser(userCredentials: ValidateUserCredentials) {
        const user = await this.usersService.findUser({ email: userCredentials.email })
        if (!user) throw new HttpException("Invalid Email", HttpStatus.BAD_REQUEST)
        return compareHashedPassword(userCredentials.password, user.password)
    }
}

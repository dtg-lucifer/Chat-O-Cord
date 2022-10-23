import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { User as UserRepository } from 'src/utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './users';

@Injectable()
export class UsersService implements IUserService {

    constructor(@InjectRepository(UserRepository) private readonly userRepository: Repository<UserRepository>) { }

    async createUser(userDetails: CreateUserDetails) {
        const existingUser = await this.userRepository.findOneBy({ email: userDetails.email })

        if (existingUser) throw new HttpException("User already exists!", HttpStatus.CONFLICT);

        const password = await hashPassword(userDetails.password)
        const newUser = this.userRepository.create({ 
            ...userDetails,
            userName: `@${userDetails.firstName.toLowerCase()}_${userDetails.lastName.toLowerCase()}`, 
            password 
        })
        
        return this.userRepository.save(newUser)
    }
}

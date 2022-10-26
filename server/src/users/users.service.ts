import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './users';

@Injectable()
export class UsersService implements IUserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async createUser(userDetails: CreateUserDetails) {
        const existingUser = await this.userRepository.findOne({ email: userDetails.email })

        if (existingUser) throw new HttpException("User already exists!", HttpStatus.CONFLICT);

        const password = await hashPassword(userDetails.password)
        const newUser = this.userRepository.create({ 
            ...userDetails,
            userName: `@${userDetails.firstName.toLowerCase().replace(" ", "")}_${userDetails.lastName.toLowerCase().replace(" ", "")}`, 
            password 
        })
        
        return this.userRepository.save(newUser)
    }

    async findUser(findUser: FindUserParams): Promise<User> {
        return await this.userRepository.findOne(findUser)        
    }
}

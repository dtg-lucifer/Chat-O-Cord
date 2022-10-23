import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUserService } from 'src/users/users';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { instanceToPlain } from "class-transformer"

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService: IAuthService,
        @Inject(Services.USERS) private userService: IUserService
    ) {}

    @Post("register")
    async registerUser(@Body() createUserDetails: CreateUserDto) {
        return instanceToPlain(await this.userService.createUser(createUserDetails))
    }

    @Post("login")
    loginUser() {}

    @Get("status")
    getUserStatus() {}
    
    @Post("logout")
    logout() {}
}

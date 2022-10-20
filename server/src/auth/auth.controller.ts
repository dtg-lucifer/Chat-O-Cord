import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Routes, Services } from 'src/utils/types';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

    @Post("register")
    @UsePipes(ValidationPipe)
    registerUser(@Body() createUserDetails: CreateUserDto) {
        console.log(createUserDetails);
    }

    @Post("login")
    loginUser() {}

    @Get("status")
    getUserStatus() {}
    
    @Post("logout")
    logout() {}
}

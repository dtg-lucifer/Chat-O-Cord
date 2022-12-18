import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IUserService } from 'src/users/users';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dto/CreateUser.dto';
import { instanceToPlain } from "class-transformer"
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService: IAuthService,
        @Inject(Services.USERS) private userService: IUserService
    ) { }

    @Post("register")
    async registerUser(@Body() createUserDetails: CreateUserDto) {
        return instanceToPlain(await this.userService.createUser(createUserDetails))
    }

    @Post("login")
    @UseGuards(LocalAuthGuard)
    login(@Res() res: Response) {
        return res.status(200).json({ message: "OK" });
    }

    @Get("status")
    @UseGuards(AuthenticatedGuard)
    getUserStatus(@Req() req: Request) {
        console.log("API GetAuthStatus", req.user)
        return req.user
    }

    @Post("logout")
    logout() { }
}

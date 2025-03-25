import { Controller, Get, Post, Delete, Put, Body, Param,Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGaurd } from './gaurds/jwt.gaurd';
import { CustomRequest } from './custom-request.interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("login")
    @UseGuards(AuthGuard("local"))
    async loginUser(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() res: Response
    ) {
        const code =await this.userService.loginUser(email,  password);
        if(code) {
            return res.status(HttpStatus.OK).json({ token: code});
        }
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Incalid Credentials' });

    }

    @Get()
    @UseGuards(JwtAuthGaurd)
    getUsers(@Req() req: CustomRequest) {
        return req.user;
    }

    @Get('/:id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    }
    @Post('userDetails')
    getUserDetails(@Body('email') email: string) {
        return this.userService.getUserDetails(email);
    }
    

    @Post()
    addUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('password') password: string
    ) {
        return this.userService.addUser(firstName, lastName, email, phone, password);
    }

    @Put('/:id')
    updateUser(
        @Param('id') id: number,
        @Body('firstName') firstName?: string,
        @Body('lastName') lastName?: string,
        @Body('email') email?: string,
        @Body('phone') phone?: string
    ) {
        return this.userService.updateUser(id, firstName, lastName, email, phone);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}

import { Controller, Post, Body, UseGuards, Res } from "@nestjs/common";
import { UserDTO } from "src/Common/DTO/user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    @Post('/signup')
    SignUp(@Body() userData: UserDTO){
        return this.authService.signUp(userData);
    }

    
    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    SignIn(@Body() userData: UserDTO, @Res() res: Response){
        return this.authService.signIn(userData, res);
    }

    @Post('/signout')
    async signout(
        @Res({passthrough: true}) res: Response
    ):Promise<{message:string}>{
        res.clearCookie('access_token');
        return {message: 'success'};
    }
};
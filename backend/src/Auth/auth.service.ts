import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDTO } from "src/Common/DTO/user.dto";
import { User } from "src/Common/Entity/user.entity";
import { UserService } from "src/Users/user.service";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {Response} from "express";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ){}
    async signUp(userData: UserDTO){
        //const createdUser: User = await this.userService.createUser(userData);
        const authData: UserDTO = {
            email: userData.email,
            password: await bcrypt.hash(userData.password, 8)
        }
        try{
            const user = await this.userService.createUser(authData);
            const payload = {sub: user.userId};
            const token = this.jwtService.sign(payload);
            return {access_token: token}
        }
        catch(err){
            throw new BadRequestException("email already exists!");
        }
    }

    async validateUser(signinData: UserDTO): Promise<User>{
        const Creds = await this.userService.findByEmail(signinData)
        if(!Creds){
            return null;
        }

        if(!(await bcrypt.compare(signinData.password, Creds.password))){
            return null
        }

        return Creds;
    }

    async signIn(userData: UserDTO, res: Response){
        const user = await this.userService.findByEmail(userData);
        const payload = {sub: user.userId}
        const token = this.jwtService.sign(payload);
        res.cookie('access_token', token, {httpOnly: true})
        return res.json({access_token: token})
    }

    async verifyCookie(cookie: any){
        try {
            const data = this.jwtService.verify(cookie);

            if(!data){
                throw new UnauthorizedException();
            }
            const Creds = await this.userService.findByEmail(data.email);
            const user = Creds.email;
            return user;
        }
        catch(err){
            throw new UnauthorizedException();
        }
    }
};
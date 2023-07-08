import {Strategy} from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { User } from "src/Common/Entity/user.entity";
import { UserDTO } from "src/Common/DTO/user.dto";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({usernameField: 'email'})
    }

    async validate(email: string, password: string): Promise<User> {
        const singindata: UserDTO = {
            email,
            password
        }
    const Creds = await this.authService.validateUser(singindata);
    if(!Creds){
        throw new UnauthorizedException('Invalid Credentials')
    }

    return Creds;
}
}

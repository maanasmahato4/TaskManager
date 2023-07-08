import {Injectable, Param, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConstant } from "src/Common/Contants/jwt.constant";
import { Request } from "express";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey: JwtConstant.secret,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    const data = req?.cookies['access_token'];
                    if(!data){
                        return null
                    }
                    return data;
                }
            ])
        })
    }

    async validate(payload: any): Promise<object>{
        if(payload == null){
            throw new UnauthorizedException();
        }

        return {userId: payload.userId, email: payload.email}
    }
}
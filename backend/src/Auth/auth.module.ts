import { Module } from "@nestjs/common/decorators/modules";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/Users/user.module";
import {JwtModule} from "@nestjs/jwt";
import { JwtConstant } from "src/Common/Contants/jwt.constant";
import { JwtStrategy } from "./jwtStrategy";
import { LocalStrategy } from "./local.strateg";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JwtConstant.secret,
            signOptions: {expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule{};
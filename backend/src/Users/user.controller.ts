import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "src/Common/DTO/user.dto";

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    @Post()
    async CreateUser(@Body() user: UserDTO){
        return await this.userService.createUser(user)
    }

    @Post('/find')
    async FindByEmail(@Body() user: UserDTO){
        return await this.userService.findByEmail(user)
    }
};
import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDTO {
    @IsEmail()
    @ApiProperty({type: String})
    email: string

    @IsNotEmpty()
    @ApiProperty({type: String})
    password: string
}
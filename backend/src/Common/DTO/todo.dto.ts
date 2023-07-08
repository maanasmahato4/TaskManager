import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class TodoDTO {
    @IsNotEmpty()
    @ApiProperty({type: String})
    todo: string

    @IsNotEmpty()
    @ApiProperty({type: Number})
    userId: number

    @IsNotEmpty()
    @ApiProperty({type: Boolean, default: false})
    status: boolean
}
import { Injectable } from "@nestjs/common";
import { UserDTO } from "src/Common/DTO/user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "src/Common/Entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}
    createUser(user: UserDTO){
        return this.userRepo.save(user);
    }

    findByEmail(user: UserDTO){
        return this.userRepo.findOne({where: {email: user.email}});
    }
}
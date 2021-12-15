import {HttpException, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User,
                private roleService: RolesService) {}

    async getUsers(){
        return await this.userRepo.findAll({include: {all: true}})
    }

    async getUser(id: number){
        return await this.userRepo.findOne({where: {id}, include: {model: Role}})
    }

    async createUser(userDto: CreateUserDto){
        if(!userDto.username || !userDto.email || !userDto.password)
            throw new HttpException('Not all data was sent', 400)

        const user = await this.userRepo.create(userDto)
        const role = await this.roleService.getRoleByName('USER')
        await user.$set('roles', [role.id])
        return user
    }

    async deleteUser(id:number){
        if(!id) throw new HttpException('ID is required', 400)
        await this.userRepo.destroy({where: {id}})
        return {id}
    }

    async updateUser(userDto: UpdateUserDto ){
        if(!userDto.id) throw new HttpException('ID is required', 400)
        await this.userRepo.update(userDto, {where: {id: userDto.id}})
        return userDto
    }
}

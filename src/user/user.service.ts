import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from "./Models/user.model";
import { CreateUserDto } from "./DTOS/create.user.dto";
import { UpdateUserDto } from "./DTOS/update.user.dto";



@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(userDto: CreateUserDto) {
        const user = await this.userModel.create(userDto);
        return user;
    }

    async isExistEmail(email: string) {
        const user = await this.userModel.findOne({ email })
        return user;
    }

    async findUser(id: string) {
        const user = await this.userModel.findById(id).select("-password")
        return user;
    }

    async findAllUsers() {
        const user = await this.userModel.find({}).select("-password")
        return user;
    }

    async updateUsers(id: string, updateUser: UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUser, { new: true })
            .select("-password")

        return user
    }

    async deleteUsers(id: string) {
        const user = await this.userModel.findByIdAndDelete(id)
        return user
    }
}

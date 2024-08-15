import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {User} from './user.entity'
import { CreateUserInput } from "./DTOs/create-user.input";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ){}

    async getUser():Promise<User[]>{
        try {
            return await this.userModel.find().exec()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUserByID(userId:string):Promise<User>{
        try {
            return await this.userModel.findById(userId)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUser(createUserInput:CreateUserInput):Promise<User>{
        try {
             const user=new this.userModel(createUserInput)
             await user.save()
             return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

}





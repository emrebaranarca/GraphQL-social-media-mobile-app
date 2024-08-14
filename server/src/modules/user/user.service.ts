import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './DTOs/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userRepository:UserRepository
    ){}
    
    async findAll(): Promise<User[]> {
        try {
            return this.userRepository.getUser()
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async findOne(userId: string): Promise<User> {
        try {
            return this.userRepository.getUserByID(userId)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUser(createUserInput:CreateUserInput):Promise<User>{
        try {
            const salt=await bcrypt.genSalt()
            createUserInput.password=await bcrypt.hash(createUserInput.password,salt)
            return await this.userRepository.createUser(createUserInput)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

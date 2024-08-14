import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./DTOs/create-user.input";

@Resolver(()=>User)
export class UserResolver{
    constructor(
        private readonly userService:UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
      try {
        return this.userService.findAll();
      } catch (error) {
        throw new Error(error.message)
      }
    }

    @Query(()=>User)
    async user(@Args('userId') userId:string):Promise<User>{
        try {
            return await this.userService.findOne(userId
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    @Mutation(()=>User)
    async createUser(
        @Args('createUserInput') createUserInput:CreateUserInput
    ):Promise<User>{
        try {
            return await this.userService.createUser(createUserInput)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

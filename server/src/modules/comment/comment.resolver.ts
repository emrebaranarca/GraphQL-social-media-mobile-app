import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";
import { UserService } from "../user/user.service";
import { CreateCommentInput } from "./DTOs/create-comment.input";
import { User } from "../user/user.entity";
import { Types } from "mongoose";
import { log } from "console";

@Resolver(()=>Comment)
export class CommentResolver{
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService
    ) {}

    @Mutation(() => Comment)
    async createComment(
        @Args('createCommentInput') createCommentInput: CreateCommentInput
    ): Promise<Comment> {
        return await this.commentService.createComment(createCommentInput);
    }

    @Query(()=>[Comment])
    async comments():Promise<Comment[]>{
        return await this.commentService.findAll()
    }

    @Query(()=>Comment)
    async comment(
        @Args('id') id:string
    ):Promise<Comment>{
        return await this.commentService.findOne(id)
    }

    @ResolveField(() => User)
    async user(@Parent() comment: Comment): Promise<User> {
        return this.userService.findOne(comment.user.toString());
    }

    @Query(()=>[Comment])
    async commentsByUser(
        @Args('id') userId:string
    ):Promise<Comment[]>{
        return await this.commentService.findCommentsByUserId(userId)
    }

    
    


    


}
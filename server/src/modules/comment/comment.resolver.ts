import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";
import { UserService } from "../user/user.service";
import { CreateCommentInput } from "./DTOs/create-comment.input";

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


    


}
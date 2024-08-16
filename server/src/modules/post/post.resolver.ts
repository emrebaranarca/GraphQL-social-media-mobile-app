import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { Post } from "./post.entity";
import { PostService } from "./post.service";
import { CreatePostInput } from "./DTOs/create-post.input";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Comment } from "../comment/comment.entity";
import { CommentService } from "../comment/comment.service";

@Resolver(() => Post)
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
        private readonly commentService: CommentService
    ) {}

    //!post listele
    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return this.postService.findAll();
    }

    //!id ye göre post al
    @Query(() => Post)
    async post(@Args('postId') postId: string): Promise<Post> {
        return this.postService.findOne(postId);
    }

    //! post oluştur
    @Mutation(() => Post)
    async createPost(
        @Args('createPostInput') createPostInput: CreatePostInput
    ): Promise<Post> {
        return this.postService.createPost(createPostInput);
    }   

    // @ResolveField(() => User)
    // async author(@Parent() post: Post): Promise<User> {
    //     return this.userService.findOne(post.author.toString());
    // }

    // @ResolveField(() => [Comment])
    // async comments(@Parent() post: Post): Promise<Comment[]> {
    //     const commentIds = post.comments.map(id => id.toString());
    //     return this.commentService.findByIds(commentIds);
    // }

    // @ResolveField(() => [User])
    // async likes(@Parent() post: Post): Promise<User[]> {
    //     const userIds = post.likes.map(id => id.toString());
    //     return this.userService.findByIds(userIds);
    // }

    //! kullanıcının postu
    @Query(() => [Post])
    async postsByAuthor(@Args('authorId') authorId: string): Promise<Post[]> {
        return this.postService.findPostsByAuthorId(authorId);
    }

    //!comment ekleme
    @Mutation(() => Post)
    async addComment(
        @Args('postId') postId: string,
        @Args('commentId') commentId: string
    ): Promise<Post> {
        return this.postService.addComment(postId, commentId);
    }

    //!like ekleme
    @Mutation(() => Post)
    async addLike(
        @Args('postId') postId: string,
        @Args('userId') userId: string
    ): Promise<Post> {
        return this.postService.addLike(postId, userId);
    }

    @Mutation(() => Post)
    async removeLike(
        @Args('postId') postId: string,
        @Args('userId') userId: string
    ): Promise<Post> {
        return this.postService.removeLike(postId, userId);
    }
}
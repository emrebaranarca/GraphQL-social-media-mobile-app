import { Inject, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CreatePostInput } from './DTOs/create-post.input';
import Redis from 'ioredis';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis
    ) {}

    async getLikeCount(postId: string): Promise<number> {
        const cachedCount = await this.redis.get(`post:${postId}:likeCount`);
        if (cachedCount) {
            return parseInt(cachedCount, 10);
        }

        const post = await this.postRepository.getPostById(postId);
        const likeCount = post.likes.length;
        await this.redis.set(`post:${postId}:likeCount`, likeCount, 'EX', 3600); // Cache for 1 hour
        return likeCount;
    }
    
    async removeLike(postId: string, userId: string): Promise<Post> {
        const post = await this.postRepository.removeLike(postId, userId);
        await this.redis.decr(`post:${postId}:likeCount`);
        return post;
    }

    async addLike(postId: string, userId: string): Promise<Post> {
        const post = await this.postRepository.addLike(postId, userId);
        await this.redis.incr(`post:${postId}:likeCount`);
        return post;
    }
    
    async findAll(): Promise<Post[]> {
        return this.postRepository.getPosts();
    }
    
    async findOne(postId: string): Promise<Post> {
        return this.postRepository.getPostById(postId);
    }

    async createPost(createPostInput: CreatePostInput): Promise<Post> {
        return this.postRepository.createPost(createPostInput);
    }

    async findPostsByAuthorId(authorId: string): Promise<Post[]> {
        return this.postRepository.getPostsByAuthorId(authorId);
    }

    async addComment(postId: string, commentId: string): Promise<Post> {
        return this.postRepository.addComment(postId, commentId);
    }


}
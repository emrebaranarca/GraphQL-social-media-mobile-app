import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CreatePostInput } from './DTOs/create-post.input';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository
    ) {}
    
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

    async addLike(postId: string, userId: string): Promise<Post> {
        return this.postRepository.addLike(postId, userId);
    }

    async removeLike(postId: string, userId: string): Promise<Post> {
        return this.postRepository.removeLike(postId, userId);
    }
}
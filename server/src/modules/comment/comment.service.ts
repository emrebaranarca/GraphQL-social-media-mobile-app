import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './DTOs/create-comment.input';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository:CommentRepository
    ){}

    async createComment(createCommentInput: CreateCommentInput): Promise<Comment> {
        try {
            return await this.commentRepository.createComment(createCommentInput);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findAll(): Promise<Comment[]> {
        try {
            return this.commentRepository.getComments();
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async findOne(commentId: string): Promise<Comment> {
        try {
            return this.commentRepository.getCommentById(commentId);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findCommentsByUserId(userId: string): Promise<Comment[]> {
        try {
            return this.commentRepository.getCommentsByUserId(userId);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByIds(commentIds: string[]): Promise<Comment[]> {
        try {
            return this.commentRepository.findByIds(commentIds);
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

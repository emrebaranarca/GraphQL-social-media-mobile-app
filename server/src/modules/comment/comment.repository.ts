import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.entity';
import { Model, Types } from 'mongoose';
import { CreateCommentInput } from "./DTOs/create-comment.input";

@Injectable()
export class CommentRepository{
    constructor(
        @InjectModel(Comment.name) 
        private commentModel:Model<Comment>
    ){}

    async createComment(createCommentInput:CreateCommentInput):Promise<Comment>{
        try {
            const comment=new this.commentModel(createCommentInput)
            await comment.save()
            return await comment
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getComments(): Promise<Comment[]> {
        try {
            return this.commentModel.find().populate('user').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getCommentById(commentId: string): Promise<Comment> {
        try {
            return this.commentModel.findById(commentId).populate('user').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getCommentsByUserId(userId: string): Promise<Comment[]> {
        try {
            return this.commentModel.find({ user: userId }).populate('user').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByIds(commentIds: string[]): Promise<Comment[]> {
        return this.commentModel.find({
          '_id': { $in: commentIds.map(id => new Types.ObjectId(id)) }
        }).exec();
      }


}
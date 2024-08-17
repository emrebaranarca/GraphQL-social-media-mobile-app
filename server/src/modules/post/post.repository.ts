import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from './post.entity';
import { CreatePostInput } from "./DTOs/create-post.input";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<Post>
    ) {}

    async getPosts(): Promise<Post[]> {
        try {
            return await this.postModel.find()
            .populate('author')
            .populate('comments')
            .populate('likes').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getPostById(postId: string): Promise<Post> {
        try {
            return await this.postModel.findById(postId)
            .populate('author')
            .populate('comments')
            .populate('likes').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createPost(createPostInput: CreatePostInput): Promise<Post> {
        try {
            const newPost = await new this.postModel(createPostInput);
            return newPost.save();
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getPostsByAuthorId(authorId: string): Promise<Post[]> {
        try {
            return await this.postModel.find({ author: authorId })
            .populate('author')
            .populate('comments')
            .populate('likes').exec();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addComment(postId: string, commentId: string): Promise<Post> {
        return await this.postModel.findByIdAndUpdate(
            postId,
            { $push: { comments: commentId } },
            { new: true }
        ).populate('comments')  // Burada populate işlemi eklenmiş olmalı
         .exec();
    }

    async addLike(postId: string, userId: string): Promise<Post> {
        return await this.postModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        ).exec();
    }

    async removeLike(postId: string, userId: string): Promise<Post> {
        return await this.postModel.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        ).exec();
    }
}
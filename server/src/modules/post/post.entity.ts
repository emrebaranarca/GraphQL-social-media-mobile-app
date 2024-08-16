import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@ObjectType()
@Schema()
export class Post extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User | Types.ObjectId;

  @Field(() => [Comment], { nullable: 'items' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[] | Types.ObjectId[];

  @Field(() => [User])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: User[] | Types.ObjectId[];

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
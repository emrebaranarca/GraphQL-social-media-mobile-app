import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Schema()
@ObjectType()
export class Comment extends Document{
    @Field(()=>ID)
    _id:string

    @Prop({required:true})
    @Field()
    content:string

    @Field(()=>User)
    @Prop({required:true,ref:'User',type:Types.ObjectId})
    user:User | Types.ObjectId

    @Field()
    @Prop({ default: Date.now })
    createdAt: Date;

}


export const CommentSchema=SchemaFactory.createForClass(Comment)
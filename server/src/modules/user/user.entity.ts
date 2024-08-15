import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
@ObjectType()
export class User extends Document{

  @Field(()=>ID)
  _id:string

  @Prop({ required: true,unique:true })
  @Field()
  username: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Prop({ required: false }) // Make sure Mongoose doesn't require this
  @Field({ nullable: true }) // Make bio nullable in GraphQL schema
  bio?: string;

  @Prop({ default: Date.now })
  @Field()
  created_at: Date;

}

export const UserSchema=SchemaFactory.createForClass(User)

import { InputType,Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCommentInput{
    
    @IsString()
    @IsNotEmpty()
    @Field()
    content:string

    @Field()
    @IsNotEmpty()
    user:string
}
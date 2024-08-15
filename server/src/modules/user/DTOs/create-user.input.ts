import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{

    @Field()
    @IsNotEmpty()
    username:string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @Field()
    @IsNotEmpty()
    @MinLength(6)
    password:string

    @Field({ nullable: true })
    bio?: string;
}
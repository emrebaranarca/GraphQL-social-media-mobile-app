import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentResolver } from './comment.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule
  ],
  providers: [
    CommentService,
    CommentRepository,
    CommentResolver
  ]
})
export class CommentModule {}

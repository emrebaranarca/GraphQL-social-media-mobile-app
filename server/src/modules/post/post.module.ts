import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { Post, PostSchema } from './post.entity';
import { PostRepository } from './post.repository';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
    CommentModule
  ],
  providers: [
    PostService,
    PostRepository,
    PostResolver,
  ],
  exports: [PostService],
})
export class PostModule {}
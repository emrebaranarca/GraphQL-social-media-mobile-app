import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:'schema.gql'
    })
    ,
    MongooseModule.forRootAsync(
      {
        useClass:MongooseConfigService
      }
    ),
    ConfigModule.forRoot(),
    UserModule,
    LikeModule,
    CommentModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

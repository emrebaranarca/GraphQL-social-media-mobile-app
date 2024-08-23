import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { CacheModule } from './cache/cache.module';

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
    PostModule,
    CommentModule,
    CacheModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LikeService } from './like.service';

@Module({
  providers: [LikeService]
})
export class LikeModule {}

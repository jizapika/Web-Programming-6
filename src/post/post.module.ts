import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
})
export class PostModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { PostService } from '../post/post.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PostService],
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])],
})
export class CommentModule {}
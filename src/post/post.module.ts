import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { UserProfileEntity } from 'src/user_profile/user_profile.entity';
import { PostGateway } from './post.gateway';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService, PostGateway],
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, UserProfileEntity])],
})
export class PostModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './user_profile.controller';
import { UserProfileService } from './user_profile.service';
import { UserProfileEntity } from './user_profile.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
})
export class UserProfileModule {}
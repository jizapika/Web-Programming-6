import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './user_profile.controller';
import { ProfileService } from './user_profile.service';
import { UserProfileEntity } from './user_profile.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
})
export class ProfileModule {}
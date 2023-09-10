import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './user_profile.controller';
import { ProfileService } from './user_profile.service';
import { UserProfileEntity } from './user_profile.entity';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from "../auth/auth.guard";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, AuthGuard],
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
})
export class ProfileModule {}
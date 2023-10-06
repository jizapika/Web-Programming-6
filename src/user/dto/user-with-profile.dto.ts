import { ApiProperty } from "@nestjs/swagger";
import { UserProfileDto } from "src/user_profile/dto/profile.dto";

export class UserWithProfileDto {
  
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  login: string;

  @ApiProperty()
  profile: UserProfileDto;
}
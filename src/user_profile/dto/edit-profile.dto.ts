import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/user.entity";

export class EditProfileDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  university: string;
}
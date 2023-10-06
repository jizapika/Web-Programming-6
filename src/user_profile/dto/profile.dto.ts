import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

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
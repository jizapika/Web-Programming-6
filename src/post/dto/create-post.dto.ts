import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  authorId: number;
}
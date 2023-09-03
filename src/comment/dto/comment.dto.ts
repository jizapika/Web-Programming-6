import { UserDto } from '../../user/dto/user.dto';
import { PostDto } from '../../post/dto/post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  body: string;

  @ApiProperty()
  post: PostDto;

  @ApiProperty()
  author: UserDto;
}
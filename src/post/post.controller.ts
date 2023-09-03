import { Get, Post, Delete, Param, Controller, Query, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { ResponseError } from '../extra/error-response';
import { SuccessResponse } from '../extra/success-response';
import { ListDto } from '../extra/ListDto/list.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiTags('posts')
@Controller('/post')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Post('/add')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async addPost(
      @Query('userId') userId: number,
      @Body() text: string
  ) {
    return null;
  }

  @Post('/like')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async likePost(
      @Query('postId') id: number,
      @Query('likerId') likerId: number
  ) {
    return null;
  }

  @Delete('/delete/:id')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async deletePost(@Param('id') id: number) {
    return null;
  }

  @Post('/edit/:id')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editPost(
      @Param('id') id: number,
      @Body() editedText: string
  ) {
    return null;
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: ListDto<PostDto> })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readPostsByUser(@Param('userId') userId: number)
      : Promise<ListDto<PostDto>> {
    return null;
  }

  @Get('/:id')
  @ApiOkResponse({ type: PostDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readPostById(@Param('id') id: number)
      : Promise<PostDto> {
    return null;
  }
}

// add_post (userId, text) <- post
// like_post (id, likerID) <- post
// delete_post (id) <- delete
// edit_post (id, editedText) <- put
// read_posts_by_user (userId) : List<<likesQty, text, id>> <- get
// read_post_by_id (id): <likesQty, text, id> <- get
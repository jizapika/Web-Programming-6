import { Get, Post, Delete, Param, Controller, Query, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
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


@ApiTags('comments')
@Controller('/comment')
export class CommentController {

  constructor(private readonly commentService: CommentService) {}

  @Post('/add')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async addComment(
    @Query('postId') postId: number,
    @Query('authorId') authorId: number,
    @Body() text: string
  ) {
    return null;
  }

  @Delete('/delete/:id')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async deleteComment(@Param('id') id: number) {
    return null;
  }

  @Post('/edit/:id')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editComment(
    @Param('id') id: number,
    @Body() editedText: string
  ) {
    return null;
  }

  @Get('/get')
  @ApiOkResponse({ type: ListDto<CommentDto> })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readCommentsByPost(@Param('postId') postId: number)
    : Promise<ListDto<CommentDto>> {
    return null;
  }

  @Get('/get')
  @ApiOkResponse({ type: CommentDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readCommentById(@Param('id') id: number)
    : Promise<CommentDto> {
    return null;
  }
}

// add_comment (postId, authorId, text) <- post
// delete_comment (id) <- delete
// edit_comment (id, editedText) <- put
// read_comments_by_post (postId) : List<<authorId, text>> <- get
// read_comment_by_id (id) : <authorId, text> <- get
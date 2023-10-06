import { Get, Post, Delete, Param, Controller, Query, Body, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ResponseError } from '../extra/error-response';
import { SuccessResponse } from '../extra/success-response';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session/session.decorator';
import { SessionContainer } from "supertokens-node/recipe/session";
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
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async addComment(
    @Session() session: SessionContainer,
    @Query('postId') postId: number,
    @Query('authorId') authorId: number,
    @Body() text: string
  ) {
    return null;
  }

  @Delete('/delete/:id')
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async deleteComment(
    @Session() session: SessionContainer,
    @Param('id') id: number
  ) {
    return null;
  }

  @Post('/edit/:id')
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editComment(
    @Session() session: SessionContainer,
    @Param('id') id: number,
    @Body() editedText: string
  ) {
    return null;
  }

  @Get('/post/:postId')
  @ApiOkResponse({ type: Array<CommentDto> })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readCommentsByPost(
    @Session() session: SessionContainer,
    @Param('postId') postId: number
  ): Promise<Array<CommentDto>> {
    return null;
  }

  @Get('/:id')
  @ApiOkResponse({ type: CommentDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readCommentById(
    @Session() session: SessionContainer,
    @Param('id') id: number
  ): Promise<CommentDto> {
    return null;
  }
}

// add_comment (postId, authorId, text) <- post
// delete_comment (id) <- delete
// edit_comment (id, editedText) <- put
// read_comments_by_post (postId) : List<<authorId, text>> <- get
// read_comment_by_id (id) : <authorId, text> <- get
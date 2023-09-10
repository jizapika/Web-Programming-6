import { Get, Post, Delete, Param, Controller, Query, Body, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";
import { ResponseError } from "../extra/error-response";
import { SuccessResponse } from "../extra/success-response";
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session/session.decorator';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";


@ApiTags("posts")
@Controller("/post")
export class PostController {

  constructor(
    private readonly postService: PostService,
  ) {
  }

  @Post("/add")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async addPost(
    @Session() session,
    @Query("userId") userId: number,
    @Body() text: string
  ): Promise<SuccessResponse> {
    await this.postService.createPost(userId, text);
    return new SuccessResponse("ok");
  }

  @Post("/like")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async likePost(
    @Session() session,
    @Query("postId") id: number,
    @Query("likerId") likerId: number
  ) {
    return null;
  }

  @Delete("/delete/:id")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async deletePost(
    @Session() session,
    @Param("id") id: number
  ): Promise<SuccessResponse> {
    await this.postService.deletePost(id);
    return new SuccessResponse('ok');
  }

  @Post("/edit/:id")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editPost(
    @Session() session,
    @Param("id") id: number,
    @Body() editedText: string
  ): Promise<SuccessResponse> {
    await this.postService.editPost(id, editedText);
    return new SuccessResponse("ok");
  }

  @Get("/user/:userId")
  @ApiOkResponse({ type: Array<PostDto> })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readPostsByUser(
    @Session() session,
    @Param("userId") userId: number
  ): Promise<Array<PostDto>> {
      return await this.postService.getPostsByUser(userId);
  }

  @Get("/:id")
  @ApiOkResponse({ type: PostDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readPostById(
    @Session() session,
    @Param("id") id: number
  ): Promise<PostDto> {
    return await this.postService.getPostById(id);
  }
}

// add_post (userId, text) <- post
// like_post (id, likerID) <- post
// delete_post (id) <- delete
// edit_post (id, editedText) <- put
// read_posts_by_user (userId) : List<<likesQty, text, id>> <- get
// read_post_by_id (id): <likesQty, text, id> <- get
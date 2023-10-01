import { Post, Delete, Param, Controller, Query, Body, UseGuards, Get } from "@nestjs/common";
import { ResponseError } from "../extra/error-response";
import { SuccessResponse } from "../extra/success-response";
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session/session.decorator';
import { SessionContainer } from "supertokens-node/recipe/session";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto"
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";


@ApiTags("users")
@Controller("/api/v1")
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }
  
  @Post('users')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async createUser(@Body() userDto: CreateUserDto) {
    await this.userService.createUser(userDto);
    return new SuccessResponse('ok');
  }

  @Post("/add")
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async addPost(
    @Session() session: SessionContainer,
    @Query("userId") userId: number,
    @Body() text: string
  ): Promise<SuccessResponse> {
    return new SuccessResponse("ok");
  }

  @Get('/supertokens/:id')
  async getUserBySupertokensId(
    @Param('id') supertokensId: string,
  ): Promise<UserDto> {
    return await this.userService.getUserBySupertokensId(supertokensId);
  }

  @Post("/like")
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async likePost(
    @Session() session: SessionContainer,
    @Query("postId") id: number,
    @Query("likerId") likerId: number
  ) {
    return null;
  }

  @Delete("/delete/:id")
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async deletePost(
    @Session() session: SessionContainer,
    @Param("id") id: number
  ): Promise<SuccessResponse> {
    return new SuccessResponse('ok');
  }

  @Post("/edit/:id")
  // @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editPost(
    @Session() session: SessionContainer,
    @Param("id") id: number,
    @Body() editedText: string
  ): Promise<SuccessResponse> {
    return new SuccessResponse("ok");
  }
}

// add_post (userId, text) <- post
// like_post (id, likerID) <- post
// delete_post (id) <- delete
// edit_post (id, editedText) <- put
// read_posts_by_user (userId) : List<<likesQty, text, id>> <- get
// read_post_by_id (id): <likesQty, text, id> <- get

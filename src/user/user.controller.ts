import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ResponseError } from "../extra/error-response";
import { SuccessResponse } from "../extra/success-response";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { UserWithProfileDto } from "./dto/user-with-profile.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { EditProfileDto } from "src/user_profile/dto/edit-profile.dto";


@ApiTags("users")
@Controller("")
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }
  
  @Post('/api/v1/users')
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

  @Get('/api/v1/supertokens/:id')
  async getUserBySupertokensId(
    @Param('id') supertokensId: string,
  ): Promise<UserWithProfileDto> {
    let newVar =
      await this.userService.getUserWithProfileBySupertokensId(supertokensId);
    return newVar;
  }
  @Post("/users/:id/edit_profile")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editProfile(
    @Session() session: SessionContainer,
    @Body() editedProfile: EditProfileDto,
    @Param("id") id: number,
  ) {
    editedProfile.userId = id;
    await this.userService.editProfile(editedProfile);
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

  @Post("users/edit_post/:id")
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

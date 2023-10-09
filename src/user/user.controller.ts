import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ResponseError } from "../extra/error-response";
import { SuccessResponse } from "../extra/success-response";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserWithProfileDto } from "./dto/user-with-profile.dto";

@ApiTags("users")
@Controller("/api/v1")
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }
  
  @Post('/users')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async createUser(@Body() userDto: CreateUserDto) {
    await this.userService.createUser(userDto);
    return new SuccessResponse('ok');
  }

  @Get('/supertokens/:id')
  async getUserBySupertokensId(
    @Param('id') supertokensId: string,
  ): Promise<UserWithProfileDto> {
    let newVar =
      await this.userService.getUserWithProfileBySupertokensId(supertokensId);
    return newVar;
  }
}

// add_post (userId, text) <- post
// like_post (id, likerID) <- post
// delete_post (id) <- delete
// edit_post (id, editedText) <- put
// read_posts_by_user (userId) : List<<likesQty, text, id>> <- get
// read_post_by_id (id): <likesQty, text, id> <- get

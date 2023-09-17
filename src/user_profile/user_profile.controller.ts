import { Get, Post, Param, Controller, Body, UseGuards } from "@nestjs/common";
import { UserProfileService } from "./user_profile.service";
import { UserProfileDto } from "./dto/profile.dto";
import { SuccessResponse } from "../extra/success-response";
import { ResponseError } from "../extra/error-response";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";

@ApiTags("profiles")
@Controller("/profile")
export class UserProfileController {
  constructor(private readonly profileService: UserProfileService) {
  }

  @Post("/edit/:id")
  @UseGuards(new AuthGuard())
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editProfile(
    @Session() session: SessionContainer,
    @Param("id") id: number,
    @Body() editedProfile: string
  ) {
    return null;
  }

  @Get("/:userId")
  @ApiOkResponse({ type: UserProfileDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readProfileByUser(
    @Session() session: SessionContainer,
    @Param("userId") userId: number
  ): Promise<UserProfileDto> {
    return null;
  }
}

// edit_profile (id, editedProfile) <- put
// read_profile_by_user (userId) : profileDto <- get
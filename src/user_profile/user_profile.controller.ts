import { Get, Post, Param, Controller, Body, UseGuards } from "@nestjs/common";
import { UserProfileService } from "./user_profile.service";
import { UserProfileDto } from "./dto/profile.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { SuccessResponse } from "../extra/success-response";
import { ResponseError } from "../extra/error-response";
import { Session } from "../auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from "src/auth/auth.guard";
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

  @Post("/edit/:userId")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editProfile(
    @Session() session: SessionContainer,
    @Body() editedProfile: EditProfileDto,
    @Param("userId") userId: number,
  ) {
    editedProfile.userId = userId;
    await this.profileService.editProfile(editedProfile);
    return new SuccessResponse('ok');
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
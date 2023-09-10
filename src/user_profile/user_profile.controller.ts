import { Get, Post, Param, Controller, Body, UseGuards } from "@nestjs/common";
import { ProfileService } from "./user_profile.service";
import { ProfileDto } from "./dto/profile.dto";
import { SuccessResponse } from "../extra/success-response";
import { ResponseError } from "../extra/error-response";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session/session.decorator";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";

@ApiTags("profiles")
@Controller("/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post("/edit/:id")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editProfile(
    @Session() session,
    @Param("id") id: number,
    @Body() editedProfile: string
  ) {
    return null;
  }

  @Get("/:userId")
  @ApiOkResponse({ type: ProfileDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readProfileByUser(
    @Session() session,
    @Param("userId") userId: number
  ): Promise<ProfileDto> {
    return null;
  }
}

// edit_profile (id, editedProfile) <- put
// read_profile_by_user (userId) : profileDto <- get
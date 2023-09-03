import { Get, Post, Param, Controller, Body } from '@nestjs/common';
import { ProfileService } from './user_profile.service';
import { ProfileDto } from './dto/profile.dto';
import { SuccessResponse } from '../extra/success-response';
import { ResponseError } from '../extra/error-response';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post('/edit/:id')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async editComment(
    @Param('id') id: number,
    @Body() editedProfile: string
  ) {
    return null;
  }

  @Get('/get')
  @ApiOkResponse({ type: ProfileDto })
  @ApiBadRequestResponse({ type: ResponseError })
  @ApiForbiddenResponse({ type: ResponseError })
  @ApiInternalServerErrorResponse({ type: ResponseError })
  async readProfileByUser(@Param('userId') userId: number)
    : Promise<ProfileDto> {
    return null;
  }
}

// edit_profile (id, editedProfile) <- put
// read_profile_by_user (userId) : profileDto <- get
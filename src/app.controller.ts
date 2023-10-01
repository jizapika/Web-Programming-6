import { Controller, Get, Render, Query, UseInterceptors, Headers,UseGuards } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { doReq, getRequestOptionsWithCookies } from "./extra/request";
import { UserDto } from "./user/dto/user.dto";
import { UserService } from "./user/user.service";
import { PostService } from "./post/post.service";
import { PageOptions } from "./extra/pagination/options";
import { Session } from "./auth/session/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import * as process from "process";
import {
  CurrentUserInterceptor
} from "./interceptor";
import { AuthGuard } from "./auth/auth.guard";

@Controller()
@UseInterceptors(
  CurrentUserInterceptor
)
@ApiExcludeController()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {
  }


  @Get()
  @UseGuards(new AuthGuard({
    sessionRequired: true,
  }))
  @Render("index")
  async root(
    @Session() session: SessionContainer,
    @Headers() headers
  ) {
    console.log(session)
    const reqOpts = getRequestOptionsWithCookies(headers);
    if (session && session.getUserId()) {
      let curUser = await doReq<UserDto>(
        `${process.env.BACKEND_URI}/users/supertokens/${session.getUserId()}`,
        reqOpts
      );
      const user = await this.userService.findUserById(session.getUserId());
      const posts = await this.postService.findAll();
      return {
        firstname: user.profile.firstname,
        lastname: user.profile.lastname,
        data: { posts }
      };
    }
    return;
  }

  @Get("/friends")
  @UseGuards(new AuthGuard({
    sessionRequired: false,
  }))
  @Render("friends")
  async friends(
    @Headers() headers,
    @Session() session: SessionContainer,
    @Query() pageOptions: PageOptions
  ) {
    console.log(session)
    return { message: "Hello world!" };
  }

  @Get("/messages")
  @Render("messages")
  messages() {
    return { message: "Hello world!" };
  }

  @Get("/settings")
  @Render("settings")
  settings() {
    return { message: "Hello world!" };
  }

  @Get("/7")
  @Render("7")
  7() {
    return { message: "Hello world!" };
  }


  @Get("/1-2")
  @Render("1-2")
  1_2() {
    return { message: "Hello world!" };
  }

  @Get('/auth/signin')
  @Render('auth/signin')
  async getSignInPage() {
    return { signInEndpoint: `${process.env.BACKEND_URI}/api/v1/auth/signin` };
  }

  @Get('/auth/signup')
  @Render('auth/signup')
  async getSignUpPage() {
    return { signUpEndpoint: `${process.env.BACKEND_URI}/api/v1/auth/signup` };
  }
}

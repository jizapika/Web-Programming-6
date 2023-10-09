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
import { AuthGuard, OptionalAuthGuard } from "./auth/auth.guard";

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
  @UseGuards(OptionalAuthGuard)
  @Render("index")
  async root(
    @Session() session: SessionContainer
  ) {
    if (session && session.getUserId()) {
      const curUser =
        await this.userService.getUserWithProfileBySupertokensId(
          session.getUserId()
        );
      const posts = await this.postService.findByUserId(curUser.id);
      return {
        data: { posts }
      };
    }

    return;
  }

  @Get("/edit/profile")
  @UseGuards(AuthGuard)
  @Render("index")
  async editProfile(
    @Session() session: SessionContainer
  ) {
    const curUser =
      await this.userService.getUserWithProfileBySupertokensId(
        session.getUserId()
      );
    const posts = await this.postService.findByUserId(curUser.id);
    return {
      edit_profile: true,
      data: { posts }
    };
  }

  @Get("/add/post")
  @UseGuards(AuthGuard)
  @Render("index")
  async addPost(
    @Session() session: SessionContainer
  ) {
    const curUser =
      await this.userService.getUserWithProfileBySupertokensId(
        session.getUserId()
      );
    const posts = await this.postService.findByUserId(curUser.id);
    return {
      add_post: true,
      data: { posts }
    };
  }

  @Get("/friends")
  @UseGuards(OptionalAuthGuard)
  @Render("friends")
  async friends(
  ) {
    return { message: "Hello world!" };
  }

  @Get("/messages")
  @UseGuards(OptionalAuthGuard)
  @Render("messages")
  messages() {
    return { message: "Hello world!" };
  }

  @Get("/settings")
  @UseGuards(OptionalAuthGuard)
  @Render("settings")
  settings() {
    return { message: "Hello world!" };
  }

  @Get("/all-posts")
  @UseGuards(OptionalAuthGuard)
  @Render("all_posts")
  async allPosts() {
    const posts = await this.postService.findAll();
    return {
      data: { posts }
    };
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

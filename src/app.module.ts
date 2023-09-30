import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserController } from "./user/user.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { UserModule } from "./user/user.module";
import { UserProfileModule } from "./user_profile/user_profile.module";
import { AuthModule } from "./auth/auth.module";
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { PostController } from "./post/post.controller";
import { PostEntity } from "./post/post.entity";
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forFeature([UserEntity, PostEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: "postgres",
        host: cfg.get("DB_HOST"),
        port: cfg.get("DB_PORT"),
        username: cfg.get("DB_USER"),
        password: cfg.get("DB_PASS"),
        database: cfg.get("DB_NAME"),
        extra: {
          ssl: ["false"]
        },
        entities: [join(__dirname, "**", "*.entity.{ts,js}")],
        synchronize: true
      })
    }),
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdparty/appinfo
        appName: "Web-Programming-6",
        websiteDomain: process.env.FRONTEND_URI,
        apiDomain: process.env.BACKEND_URI,
        apiBasePath: "api/v1/auth",
        websiteBasePath: "/auth"
      }
    }),
    CommentModule,
    UserProfileModule,
    PostModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, UserService, PostService]
})
export class AppModule {
}
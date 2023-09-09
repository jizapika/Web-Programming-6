import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { ProfileModule } from "./user_profile/user_profile.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://try.supertokens.com",
      // apiKey: <API_KEY(if configured)>,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdparty/appinfo
        appName: "Web-Programming-6",
        apiDomain: "http://locahost:8080",
        websiteDomain: "http://locahost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
      }
    }),
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
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
    CommentModule,
    ProfileModule,
    PostModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
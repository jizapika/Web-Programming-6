import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { UserProfileModule } from "./user_profile/user_profile.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
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
    AuthModule.forRoot({
      connectionUri: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdparty/appinfo
        appName: "Web-Programming-6",
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
      }
    }),
    CommentModule,
    UserProfileModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
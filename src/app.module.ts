import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { ProfileModule } from "./user_profile/user_profile.module";

@Module({
  imports: [ConfigModule.forRoot({
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
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
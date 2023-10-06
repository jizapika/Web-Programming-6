import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { doReq } from "./extra/request";
import { UserWithProfileDto } from "./user/dto/user-with-profile.dto";

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTimeInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        return { ...data, time: Date.now() - currentTime };
      }),
    );
  }
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const session = ctx.switchToHttp().getRequest().session;

    let me = null;
    if (session) {
      const userId = session.getUserId();
      try {
        me = await doReq<UserWithProfileDto>(
          `${process.env.BACKEND_URI}/api/v1/supertokens/${userId}`
        );
      } catch (err) {
        console.log("Failed to get `me`, because " + err)
      }
    }

    return next.handle().pipe(
      map((data) => ({
        ...data,
        me: me,
      })),
    );
  }
}
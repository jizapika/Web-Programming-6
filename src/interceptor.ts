import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { doReq } from './extra/request';
import { UserDto } from './user/dto/user.dto';

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
    const req = ctx.switchToHttp().getRequest();

    let me = null;
    if (req.session) {
      const userId = req.session.getUserId();
      me = await doReq<UserDto>(
        `${process.env.BACKEND_URI}/api/v1/users/supertokens/${userId}`,
      );
    }

    return next.handle().pipe(
      map((data) => ({
        ...data,
        me: me,
      })),
    );
  }
}
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('views/pages')
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('/friends')
  @Render('friends')
  friends() {
    return { message: 'Hello world!' };
  }

  @Get('/messages')
  @Render('messages')
  messages() {
    return { message: 'Hello world!' };
  }

  @Get('/settings')
  @Render('settings')
  settings() {
    return { message: 'Hello world!' };
  }
}

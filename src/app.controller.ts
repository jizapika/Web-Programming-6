import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('/friends')
  @Render('friends')
  friends() {
    return {message: 'Hello world!' };
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

  @Get('/7')
  @Render('7')
  7() {
    return {message: 'Hello world!' };
  }


  @Get('/1-2')
  @Render('1-2')
  1_2() {
    return {message: 'Hello world!' };
  }
}

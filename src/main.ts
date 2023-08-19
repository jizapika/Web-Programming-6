import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseTimeInterceptor } from "./interceptor";
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.useGlobalInterceptors(new ResponseTimeInterceptor());

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(
    PORT, () => console.log(`Server started on port ${PORT}`)
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseTimeInterceptor } from "./interceptor";
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function setupSwagger(app: INestApplication) {
  const opts = new DocumentBuilder()
    .setTitle('web')
    .setDescription('The fellow students API')
    .setVersion('1.0')
    .addCookieAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup('swagger', app, doc);
}



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views', 'pages'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.useGlobalInterceptors(new ResponseTimeInterceptor());

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  setupSwagger(app);

  await app.listen(
    PORT, () => console.log(`Server started on port ${PORT}`)
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseTimeInterceptor } from "./interceptor";
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SupertokensExceptionFilter } from './auth/auth.filter';

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
  app.useGlobalFilters(new SupertokensExceptionFilter());
  
  app.enableCors({
    origin: [process.env.BACKEND_URI],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  setupSwagger(app);

  await app.listen(
    PORT, () => console.log(`Server started on port ${PORT}`)
  );
}
bootstrap();

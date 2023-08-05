import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public/Web-Programming-Course'));

  const defaultPort = 3000;
  const radix = 10;
  await app.listen(
    process.env.PORT ? parseInt(process.env.PORT, radix) : defaultPort,
  );
}
bootstrap();

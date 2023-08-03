import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const defaultPort = 3000;
  const radix = 10;
  await app.listen(
    process.env.PORT ? parseInt(process.env.PORT, radix) : defaultPort,
  );
}
bootstrap();

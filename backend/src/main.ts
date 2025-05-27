import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  console.log('== DB_HOST :', process.env.DB_HOST);
  console.log('== DB_PORT :', process.env.DB_PORT);
  console.log('== DB_USER :', process.env.DB_USER);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  console.log(`✅ Backend is running on http://localhost:${port}`);
}

bootstrap();

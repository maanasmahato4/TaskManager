import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret-key',
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);
}
bootstrap();

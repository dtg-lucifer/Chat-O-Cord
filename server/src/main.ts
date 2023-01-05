import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { Session } from './utils/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { WebsocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const { PORT, COOKIE_SECRET, CORS_ORIGIN } = process.env;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hour =
    currentDate.getHours() > 12
      ? currentDate.getHours() - 12
      : currentDate.getHours();
  const min =
    currentDate.getMinutes() < 10
      ? `0${currentDate.getMinutes()}`
      : currentDate.getMinutes();
  const sec =
    currentDate.getSeconds() < 10
      ? `0${currentDate.getSeconds()}`
      : currentDate.getSeconds();

  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);
  const adapter = new WebsocketAdapter(app)

  app.useWebSocketAdapter(adapter)
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: [CORS_ORIGIN], credentials: true });
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: true,
      resave: false,
      name: "CHATAPP_SESSION_ID",
      cookie: {
        maxAge: 86400000, // to ensure that the cookie expires after a day (in miliseconds)
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.info(
        `[Debug] 8998  - ${month}/${day}/${year}, ${hour}:${min}:${sec} ${
          hour < 12 ? `PM` : `AM`
        }     LOG [Info] Server started to listening on https://localhost:${PORT}/api/v1`,
      );
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();

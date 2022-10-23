import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"

async function bootstrap() {

  const currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()
  let min = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()
  let sec = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds()

  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(new ValidationPipe())
  app.use(session({
    secret: COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 86400000, // to ensure that the cookie resets after a day (a day has 86400 seconds hence there is 86400000 miliseconds)
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  try {
    await app.listen(PORT, () => {
      console.info(`[Debug] 8998  - ${month}/${day}/${year}, ${hour}:${min}:${sec} ${hour < 12 && `PM`}     LOG [Info] Server started to listening on https://localhost:${PORT}/api/v1`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
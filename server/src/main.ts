import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";

async function bootstrap() {

  const currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()
  let min = currentDate.getMinutes()
  let sec = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds()

  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(new ValidationPipe())
  try {
    await app.listen(PORT, () => {
      console.info(`[Debug] 8998  - ${month}/${day}/${year}, ${hour}:${min}:${sec} ${hour < 12 && `PM`}     LOG [Info] Server started to listening on https://localhost:${PORT}/api/v1`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
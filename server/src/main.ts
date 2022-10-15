import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  try {
    await app.listen(PORT, () => {
      console.info(`\nServer Running On Port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  try {
    await app.listen(PORT, () => {
      console.info(`Server Running On Port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
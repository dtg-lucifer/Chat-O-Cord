import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  try {
    await app.listen(process.env.PORT || 3001, () => {
      console.info(`Server Running On Port ${PORT || 3001}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    console.log(`Server Listening at PORT:${process.env.PORT}`);
  });
}
bootstrap();

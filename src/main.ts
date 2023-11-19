import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './shared/config/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  SwaggerConfig(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

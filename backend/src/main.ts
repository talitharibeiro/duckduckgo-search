import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If using cookies or authentication headers
  });

  await app.listen(3000);
}
bootstrap();

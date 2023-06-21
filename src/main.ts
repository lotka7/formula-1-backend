import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global prefix
  app.setGlobalPrefix('api');

  // Set ValidationPipe globaly
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('self-checkout api')
    .setDescription('The self-checkout API description')
    .setVersion('1.0')
    .addTag('Stock', 'Endpoints related to Stock')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');

  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };
  SwaggerModule.setup('/swagger', app, document, options);

  await app.listen(3001);
}
bootstrap();

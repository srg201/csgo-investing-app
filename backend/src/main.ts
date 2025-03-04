import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // app.use(
  //   rateLimit({
  //     windowMs: 60000,
  //     max: 60,
  //   }),
  // );

  app.enableCors({
    origin: configService.get('CLIENT_URL'),
    credentials: true,
  });

  const isDev = configService.get('NODE_ENV') === 'development';

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('Cs2 invest API')
      .setDescription('Project for calculating Investing ROI in Cs2')
      .setVersion('1.0')
      .addTag('cs2')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  const port = configService.get('PORT', 3001);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

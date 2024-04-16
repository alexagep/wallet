import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ['wallets'],
      protoPath: [join(__dirname, 'grpc-wallets/proto/wallets.proto')],
      url: `${process.env.GRPC_URL}`,
    },
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('upload + download service')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  const port = configService.get<number>('PORT');

  await app.listen(port, (): void => {
    console.log('server is running on port', port);
  });
}
bootstrap();

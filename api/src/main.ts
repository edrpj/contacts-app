import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage } from 'umzug';

import { AppModule } from './app.module';
import { umzugInitializer } from '../migrator';
import { CustomValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(3000);

  // DATABASE MIGRATIONS
  const sequelize = app.get(Sequelize);
  const config = app.get(ConfigService);
  const appEnv = config.get<string>('appEnv');

  if (appEnv === 'PRODUCTION') {
    umzugInitializer({
      migrations: {
        glob: ['../migrations/*.js', { cwd: __dirname }],
      },
      context: sequelize,
      storage: new SequelizeStorage({
        sequelize,
      }),
      logger: console,
    });
  }
}
bootstrap();

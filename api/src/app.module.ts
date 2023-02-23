import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './bussiness/contacts/contacts.module';
import { UsersModule } from './bussiness/users/users.module';

// CONFIG
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.target_db'),
        autoLoadModels: true,
        login: false,
        synchronize: false,
      }),
    }),
    ContactsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

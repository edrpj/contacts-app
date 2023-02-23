import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage, UmzugOptions } from 'umzug';
import { DateTime } from 'luxon';

dotenv.config();

export const umzugInitializer = async (
  options: UmzugOptions<Sequelize>,
  fromCLI = false,
) => {
  const umzugInstance = umzugFactory(options, fromCLI);
  if (fromCLI) {
    return umzugInstance.runAsCLI();
  }

  await umzugInstance.up();
};

const umzugFactory = (options: UmzugOptions<Sequelize>, fromCLI: boolean) => {
  if (fromCLI) {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
      },
    );

    return new Umzug({
      migrations: {
        glob: ['./migrations/*.ts', { cwd: __dirname }],
      },
      create: {
        folder: './migrations',
        template: (filepath) => {
          // We override the file path to add our own YYYYMMDDHHmmSS- prefix.
          const dirName = path.dirname(filepath);
          const fileName = path.basename(filepath);

          const matchResults = fileName.match(
            /[0-9]{4}\.[0-9]{2}\.[0-9]{2}T[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.(.*)/,
          );
          const realFileName = matchResults[1];

          const dateString = DateTime.now().toFormat('yyyyLLddhhmmss');

          const fixedFilePath = path.join(
            dirName,
            `${dateString}-${realFileName}`,
          );
          return [
            [
              fixedFilePath,
              fs
                .readFileSync(
                  path.join(__dirname, 'migrations/.migration-template'),
                )
                .toString(),
            ],
          ];
        },
      },
      context: sequelize,
      storage: new SequelizeStorage({
        sequelize,
      }),
      logger: console,
    });
  }

  return new Umzug(options);
};

if (require.main === module) {
  umzugInitializer(null, true);
}

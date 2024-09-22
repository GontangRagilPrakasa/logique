import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.APP_ENV == "production" ? false : true,
  logging: false,
  entities: [...(process.env.APP_ENV === 'production' ? ['dist/modules/**/*.entity{.ts,.js}'] : ['src/modules/**/*.entity{.ts,.js}'])],
});
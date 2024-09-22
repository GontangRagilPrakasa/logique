import 'reflect-metadata';
import { AppDataSource } from '../config/db';

const runMigrations = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

runMigrations();
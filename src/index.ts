import app from './app';
import { AppDataSource } from "./config/db";
import 'reflect-metadata';

async function bootstrap() {
  const port = process.env.APP_PORT || 8000


  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  })
}
bootstrap()
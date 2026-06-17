import { registerAs } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db',

  entities: [__dirname + '/../../core/domain/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../db/migrations/*{.ts,.js}'],

  synchronize: process.env.NODE_ENV !== 'production',
}));

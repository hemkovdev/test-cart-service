import { registerAs } from '@nestjs/config';

const isProd = () => process.env.NODE_ENV === 'production';

const required = (name: string): string => {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
};

const optional = (name: string): string | undefined => {
  const v = process.env[name]?.trim();
  return v || undefined;
};

const requiredInt = (name: string): number => {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing required env: ${name}`);
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) throw new Error(`${name} must be integer`);
  return n;
};

export default registerAs('database', () => ({
  type: 'mongodb' as const,

  host: required('DB_HOST'),
  port: requiredInt('DB_PORT'),
  database: required('DB_NAME'),

  // 🔥 Conditional auth
  username: isProd() ? required('DB_USERNAME') : optional('DB_USERNAME'),

  password: isProd() ? required('DB_PASSWORD') : optional('DB_PASSWORD'),

  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',

  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
}));

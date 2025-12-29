import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const buildMongoUri = (cfg: ConfigService): string => {
  const host = cfg.get<string>('database.host')!;
  const port = cfg.get<number>('database.port')!;
  const dbName = cfg.get<string>('database.database')!;
  const username = cfg.get<string | undefined>('database.username');
  const password = cfg.get<string | undefined>('database.password');

  if (username && password) {
    return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}`;
  }

  return `mongodb://${host}:${port}/${dbName}`;
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: buildMongoUri(cfg),
        ssl: cfg.get<boolean>('database.ssl', false),
        connectionFactory: (connection) => {
          console.log('📡 MongoDB readyState:', connection.readyState);

          if (connection.readyState === 1) {
            console.log('✅ MongoDB already connected');
          }

          connection.on('connected', () => {
            console.log('✅ MongoDB connected (event)');
          });

          connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
          });

          connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
          });

          return connection;
        },
      }),
    }),
  ],
})
export class DatabaseModule {}

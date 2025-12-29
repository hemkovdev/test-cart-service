import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import databsaeConfig from './config/databsae.config';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './module/cart-service/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
      load: [databsaeConfig],
    }),
    DatabaseModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

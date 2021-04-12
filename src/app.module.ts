import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BullModule } from '@nestjs/bull';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackgroundDataLoadersModule } from './background-data-loaders/background-data-loaders.module';

@Module({
  imports: [  GraphQLModule.forRoot({autoSchemaFile: true,}), BackgroundDataLoadersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

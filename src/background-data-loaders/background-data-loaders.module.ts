import { Module } from '@nestjs/common';
import { BackgroundDataLoadersService } from './background-data-loaders.service';
import { BackgroundDataLoadersResolver } from './background-data-loaders.resolver';
import { BullModule } from '@nestjs/bull';
import { BackgroundDataLoadersProcessor } from './background-data-loaders.processor';

// limits for the rate new jobs will be processed to ensure trickle processing
// bullLimitMax jobs per bullLimitDuration
// TODO: this should be managed in env var or configurable through API
const bullLimitMax = 1; // limit to 1 only because this is a background job
const bullLimitDuration = 10000;

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  BullModule.registerQueue({
    name: 'background-data',
    limiter: { max: bullLimitMax, duration: bullLimitDuration },
  })],
  providers: [BackgroundDataLoadersResolver, BackgroundDataLoadersService, BackgroundDataLoadersProcessor]
})
export class BackgroundDataLoadersModule { }

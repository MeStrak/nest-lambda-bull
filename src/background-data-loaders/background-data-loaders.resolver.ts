import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BackgroundDataLoadersService } from './background-data-loaders.service';
import { BackgroundDataLoader } from './entities/background-data-loader.entity';
import { CreateBackgroundDataLoaderInput } from './dto/create-background-data-loader.input';
import { json } from 'express';

@Resolver(() => BackgroundDataLoader)
export class BackgroundDataLoadersResolver {
  constructor(private readonly backgroundDataLoadersService: BackgroundDataLoadersService) { }

  @Mutation(() => Boolean)
  scheduleDataLoad(@Args('createBackgroundDataLoaderInput') createBackgroundDataLoaderInput: CreateBackgroundDataLoaderInput) {
    this.backgroundDataLoadersService.scheduleBackgroundDataJob(createBackgroundDataLoaderInput);    
    return true;
  }

  @Mutation(() => String)
  emptyBackgroundDataJobQueue(@Args('id', { type: () => Int }) id: number) {
    const result = this.backgroundDataLoadersService.emptyBackgroundDataJobQueue();
    return result;
  }

  @Query(() => String, { name: 'getBasicBackgroundDataLoaderStats' })
  getDataLoaderQueueStats() {
    return this.backgroundDataLoadersService.getBasicQueueStats();
  }
}

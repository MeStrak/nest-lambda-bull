// this entity is useless and can be removed
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BackgroundDataLoader {
  @Field(() => Int, { description: 'Start date sent to the jobs, the first batch of jobs will have this as an input start date' })
  startDate: number;

  @Field(() => Int, { description: 'End date sent to the jobs, the final batch of jobs will have this as an input end date' })
  endDate: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  config1: number; //array of strings

  @Field(() => Int, { description: 'Example field (placeholder)' })
  config2: number; //array of strings

  @Field(() => Int, { description: 'Example field (placeholder)' })
  config3: number; //array of objects

  @Field(() => Int, { description: 'Example field (placeholder)' })
  config4: number; //array of strings
}
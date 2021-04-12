import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Config3Input } from './config-3.input';

@InputType()
export class CreateBackgroundDataLoaderInput {
  
  @Field(() => Date, { description: 'Start date sent to the jobs, the first batch of jobs will have this as an input start date' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Field(() => Date, { description: 'End date sent to the jobs, the final batch of jobs will have this as an input end date' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @Field(() => [String], { description: 'Mandatory array of config files, should be in format <filename>.yml' })
  config1: string[]; //array of strings

  @Field(() => [String], { description: 'Optional array for config 2', nullable: true })
  @IsOptional()
  config2?: string[]; //array of strings

  @Field(() => [Config3Input], { description: 'Optional array for config 3', nullable: true })
  @IsOptional()
  config3?: Config3Input[]; //array of objects

  @Field(() => [String], { description: 'Optional array for config 4', nullable: true })
  @IsOptional()
  config4?: string[]; //array of strings
}
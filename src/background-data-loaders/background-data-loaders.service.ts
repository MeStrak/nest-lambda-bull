import { Injectable } from '@nestjs/common';
import Bull, { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { CreateBackgroundDataLoaderInput } from './dto/create-background-data-loader.input';

type BullJobInput = {
  name?: string, data: CreateBackgroundDataLoaderInput, opts?: Bull.JobOptions
};

type fullInputData = CreateBackgroundDataLoaderInput & {start?: Date}


@Injectable()
export class BackgroundDataLoadersService {
  constructor(@InjectQueue('background-data') private backgroundDataQueue: Queue) { }

  async getBasicQueueStats() {
    const queueStats=await this.backgroundDataQueue.getJobCounts();
    return JSON.stringify(queueStats);
  }

  async emptyBackgroundDataJobQueue() {
    this.backgroundDataQueue.empty();
    const queueStats=await this.backgroundDataQueue.getJobCounts();
    return JSON.stringify(queueStats);
  }

  async scheduleBackgroundDataJob(jobInput: CreateBackgroundDataLoaderInput) {
    const allJobs = this.splitJobs(jobInput);
    
    console.log('Adding ' + allJobs.length + ' to queue' + this.backgroundDataQueue.name)
    await this.backgroundDataQueue.addBulk(allJobs);
    
    return await this.backgroundDataQueue.getJobCounts();
  }
  
  /**
   * Splits a data load job into several chunks by date and config file name that can be added to the queue individually.
   * 
   *
   * @param jobInput - the input which will be split into chunks
   *
   */
  private splitJobs(jobInput: CreateBackgroundDataLoaderInput): BullJobInput[] {
    const dateChunks = this.chunkDates(jobInput.startDate, jobInput.endDate);
    let jobs: BullJobInput[] = [];
    const jobCreationDateTime = new Date();

    for (var dateChunk of dateChunks) {
      console.log('===== date chunk =====')
      for (var config of jobInput.config1) {
        let jobData:fullInputData = { ...jobInput };
        jobData.start = jobCreationDateTime;
        jobData.startDate = dateChunk.startDate;
        jobData.endDate = dateChunk.endDate;
        jobData.config1 = [config];

        let job = {
          //name: name can be set later to have different processors per job type (per config type?)
          data: jobData,
          opts: {delay: 10000} // TODO: set delay as option when scheduling from API (currently defaults to xxx to cancel in case of f**k ups)
        }
        jobs.push(job);
      }
    }

    console.log(jobs);
    return (jobs);
  }

  /**
   * Given a date range, generates an array of start and end dates chunked by week.
   * 
   *
   * @param start - first date of the date range
   * @param end - last date of the date range
   * @returns Array of start and end dates - first and final array elements could be less than 7 days depending on day of week.
   *
   */
  private chunkDates(start: Date, end: Date): { startDate: Date, endDate: Date }[] {
    const chunk = require('chunk-date-range');
    const chunkDuration = 'week';

    const chunks = chunk(start, end, chunkDuration);
    const result = chunks.map(dateChunk => ({ startDate: dateChunk.start, endDate: dateChunk.end }));

    return result;

  }
}

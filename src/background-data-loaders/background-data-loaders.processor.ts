import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import AWS from 'aws-sdk';


@Processor('background-data')
export class BackgroundDataLoadersProcessor {
  @Process()
  async processJob(job: Job<unknown>) {
    console.log('start: ' + job.data['startDate'] + ', end: ' + job.data['endDate']);
    
    // https://stackoverflow.com/questions/33659059/invoke-amazon-lambda-function-from-node-app
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html

    let AWS = require("aws-sdk"); 

    // TODO: read keys from env
    AWS.config.update({
      accessKeyId: 'x',
      secretAccessKey: 'y',
      region: 'eu-west-1',
    });

    const params = {
      FunctionName: 'invoke-test',
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(job.data),
    };

    const result = await (new AWS.Lambda().invoke(params).promise());
    console.log(result);

    return {};
  }
}
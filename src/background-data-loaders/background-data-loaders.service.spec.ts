import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundDataLoadersService } from './background-data-loaders.service';

describe('BackgroundDataLoadersService', () => {
  let service: BackgroundDataLoadersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundDataLoadersService],
      imports: [
        BullModule.registerQueue({
          name: 'background-data',
        }),
      ],
    }).compile();

    service = module.get<BackgroundDataLoadersService>(BackgroundDataLoadersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one date chunk if range is < 1 week', () => {
    const startDate = new Date('2021-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-03T00:00:00.000Z');
    const result = service["chunkDates"](startDate, endDate);
    
    const expected = [
      {startDate, endDate},
    ]

    expect(result).toEqual(expected);
  });

  it('should return one date chunk with the same dates if range is < 1 week', () => {
    const startDate = new Date('2021-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-03T00:00:00.000Z');
    const result = service["chunkDates"](startDate, endDate);
    
    const expected = [
      {startDate, endDate},
    ]

    expect(result).toEqual(expected);
  });

  it('should return 4 date chunks if range is 25 days', () => {
    const startDate = new Date('2021-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-25T00:00:00.000Z');
    const result = service["chunkDates"](startDate, endDate);
    
    const expected = [
      {startDate: startDate, endDate: new Date('2021-01-04T00:00:00.000Z')},
      {startDate: new Date('2021-01-04T00:00:00.000Z'), endDate: new Date('2021-01-11T00:00:00.000Z')},
      {startDate: new Date('2021-01-11T00:00:00.000Z'), endDate: new Date('2021-01-18T00:00:00.000Z')},
      {startDate: new Date('2021-01-18T00:00:00.000Z'), endDate: endDate}
    ]

    expect(result).toEqual(expected);
  });

  it('should return correct number of date chunks if range is 2 years', () => {
    const startDate = new Date('2019-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-25T00:00:00.000Z');
    const result = service["chunkDates"](startDate, endDate);

    //it's not 104 because of week start and ends
    expect(result).toHaveLength(108);
    expect(result[0].startDate).toStrictEqual(startDate);
    expect(result[result.length-1].endDate).toStrictEqual(endDate);
  });

});

## Description

Test project to play with Bull queues and invoking lambda functions from NestJS. Also testing of some Bull dashboards.

This repository is not actively maintained - it was just a playground used when testing some features.

- Takes an input payload, splits it into chunks based on dates
- Creates a bull job for each of the chunks
- When processed a job will invoke a lambda function sending the chunk as the payload
- Also includes 2 docker images to test bull-board and arena bull dashboards (only arena was working when I tested it)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# startup the docker images
docker-compose -f docker-compose.dev.yml up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Example queries/mutations for use in GraphQL playground.
```
mutation empty {
  emptyBackgroundDataJobQueue(id: 3)
}

mutation schedule($input: CreateBackgroundDataLoaderInput!) {
  scheduleDataLoad(createBackgroundDataLoaderInput: $input)
}

mutation bigschedule($input2: CreateBackgroundDataLoaderInput!) {
  scheduleDataLoad(createBackgroundDataLoaderInput: $input2)
}

mutation schedulefail($inputInvalid: CreateBackgroundDataLoaderInput!) {
  scheduleDataLoad(createBackgroundDataLoaderInput: $inputInvalid)
}

query getstats {
  getBasicBackgroundDataLoaderStats
}
```

Some example input data (add it to query variables in GraphQL playground).
```json
{
  "input":{
    "startDate": "2021-01-25T00:00:00.000Z",
    "endDate": "2021-01-26T00:00:00.000Z",
    "config1": ["fileone", "fileone", "fileone"],
    "config2": ["2one", "2two", "2three"],
    "config3": [{"code1": "poo", "code2": "wee"}, {"code1": "sneeze", "code2": "fart"}],
    "config4": ["4one", "4two", "4three"]
  },
    "input2":{
    "startDate": "2019-01-25T00:00:00.000Z",
    "endDate": "2021-01-26T00:00:00.000Z",
    "config1": ["fileone", "filetwo", "filethree"],
    "config2": ["2one", "2two", "2three"],
    "config3": [{"code1": "poo", "code2": "wee"}, {"code1": "sneeze", "code2": "fart"}]
    },
    "inputInvalid":{
    "endDate": "2021-12-25T00:00:00.000Z",
    "config1": ["fileone", "fileone", "fileone"],
    "config2": ["2one", "2two", "2three"],
    "config3": [{"code1": "poo", "code2": "wee"}, {"code1": "sneeze", "code2": "fart"}]
    }
}
```

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Config3Input {
    @Field()
    readonly code1: string;

    @Field()
    readonly code2: string;
}
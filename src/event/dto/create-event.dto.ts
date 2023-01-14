import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsNumber,IsOptional, IsMilitaryTime,IsDate} from 'class-validator'
export class CreateEventDto {
    @ApiProperty({example:'name1',description:'name of event'})
    @IsOptional()
    @IsString() 
    readonly name:string;
    @ApiProperty({example:"200-01-30",description:'start_date of event'})
    @IsDate()
    readonly start_date:Date;
    @ApiProperty({example:'photo',description:'Equipment image'})
    @IsString()
    readonly photo:string;
    @ApiProperty({example:'14:00',description:'start_time of event'})
    @IsString()
    @IsMilitaryTime({ message: "openingTime must be a valid time in format HH24:MM" })
    readonly start_time:string;
    @ApiProperty({example:'2022-01-31',description:'finish_date of event'})
    @IsString()
    readonly finish_date:Date;
    @ApiProperty({example:'19:00',description:'finish_time of event'})
    @IsString()
    @IsMilitaryTime({ message: "openingTime must be a valid time in format HH24:MM" })
    readonly finish_time:string;
    @ApiProperty({example:'Info1',description:'info of event'})
    @IsString()
    readonly info:string;
}



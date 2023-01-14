import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsNumber,IsOptional} from 'class-validator'
export class CreateDistrictDto {
    @ApiProperty({example:'name1',description:'name of district'})
    @IsString({message:'Name string bolishi kerak'})
    readonly name:string;
    @ApiProperty({example:'2',description:'id of region'})
    @IsOptional()
    @IsNumber()
    readonly region_id:number;
}

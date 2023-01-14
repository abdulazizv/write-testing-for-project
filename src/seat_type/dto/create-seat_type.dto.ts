import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator'
export class CreateSeatTypeDto {
    @ApiProperty({example:'name1',description:'name of seat-type'})
    @IsString({message:'Seat-type name must be a string'})
    readonly name:string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRegionDto 
{
    @ApiProperty({example:'name1',description:'name of region'})
    @IsOptional()
    @IsString()
    readonly name:string;
    @ApiProperty({example:'60',description:'number of region'})
    @IsOptional()
    @IsNumber()
    readonly postpone:number;
}

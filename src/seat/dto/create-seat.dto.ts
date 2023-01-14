import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSeatDto {
    @ApiProperty({example:'1',description:'id of sector'})
    @IsOptional()
    @IsNumber({},{message:"sectorning type number bo'lishi kerak"})
    readonly sector:number;
    @ApiProperty({example:'2',description:'number of row'})
    @IsOptional()
    @IsNumber({},{message:"row_number type number "})
    readonly row_number:number;
    @ApiProperty({example:'100',description:'number of seat'})
    @IsOptional()
    @IsNumber({},{message:"number type number "})
    readonly number:number;
    @ApiProperty({example:'1',description:'id of venue'})
    @IsOptional()
    @IsNumber({},{message:"venue_id type number "})
    readonly venue_id:number;
    @ApiProperty({example:'1',description:'id of seat_type'})
    @IsOptional()
    @IsNumber({},{message:"seat_type_id type number "})
    readonly seat_type_id:number;
    @ApiProperty({example:'[x,y][100,1231]',description:'location_in_schema of location_in_schema'})
    @IsString({message:'location_in_scheme need to be string'})
    readonly location_in_schema:string;
}

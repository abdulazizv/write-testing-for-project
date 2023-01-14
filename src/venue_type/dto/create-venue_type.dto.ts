import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVenueTypeDto {
    @ApiProperty({example:'name1',description:'name of venue-type'})
    @IsString({message:'Name string bolishi kerak!'})
    readonly name:string;
    @ApiProperty({example:'2',description:'id of venue'})
    @IsOptional()
    @IsNumber({},{message:"venue_id number bolishi kerak" })
    readonly venue_id:number;
}

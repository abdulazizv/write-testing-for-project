import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { GeometryDataType } from "sequelize";

export class CreateVenueDto {
    @ApiProperty({example:'name1',description:'name of venue'})
    @IsString({message:"name string bolishi kerak"})
    readonly name:string;
    @ApiProperty({example:'Adress1',description:'addres of venue'})
    @IsString({message:"adress string bolishi kerak"})
    readonly address:string;
    @ApiProperty({example:'locatarsojsbakbfd',description:'location of venue'})
    @IsString({message:"location string bolishi kerak"})
    readonly location:string;
    @ApiProperty({example:'site.com',description:'site of venue'})
    @IsString({message:"site string bolishi kerak"})
    readonly site:string;
    @ApiProperty({example:'998 90 024 94 14',description:'phone of venue'})
    @IsString({message:"phone string bolishi kerak"})
    readonly phone:string;
    @ApiProperty({example:'1',description:'id of venue_type'})
    @IsOptional()
    @IsNumber({},{message:'venue_type_id number bolishi kerak'})
    readonly venue_type_id:number;
    @ApiProperty({example:'x,u [1231],[x1322]',description:'shcema of venue'})
    @IsString({message:'Schema string bolishi kerak'})
    readonly schema:string;
    @ApiProperty({example:'3',description:'id of region'})
    @IsNumber({},{message:"region_id type number bolishi kerak"})
    readonly region_id:number;
    @ApiProperty({example:'2',description:'id of district'})
    @IsNumber({},{message:"district_id type number bolishi kerak"})
    readonly district_id:number;
}

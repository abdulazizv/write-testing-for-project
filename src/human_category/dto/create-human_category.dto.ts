import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHumanCategoryDto {
    @ApiProperty({example:'1',description:'name of human-category'})
    @IsOptional()
    @IsString()
    readonly name:string;
    @ApiProperty({example:'7',description:'The youngest age for event'})
    @IsOptional()
    @IsNumber({},{message:'bu type number bolishi kerak'})
    readonly start_age:number;
    @ApiProperty({example:'70',description:'The oldest age for event'})
    @IsOptional()
    @IsNumber({},{message:'bu type number bolishi kerak'})
    readonly finish_age:number;
    @ApiProperty({example:'1',description:'foreign key of genderTable'})
    @IsOptional()
    @IsNumber({},{message:'bu type number bolishi kerak'})
    readonly gender:number;
}

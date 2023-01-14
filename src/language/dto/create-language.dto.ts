import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLanguageDto {
    @ApiProperty({example:'english',description:'name of language'})
    @IsOptional()
    @IsString()
    readonly language:string;
    @ApiProperty({example:'English language is the most common language in the world',description:'description of language'})
    @IsOptional()
    @IsString()
    readonly description:string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCountryDto {
    @ApiProperty({example:'1',description:'name of country'})
    @IsString()
    readonly country:string;
}

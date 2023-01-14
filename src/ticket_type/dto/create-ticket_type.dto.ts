import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketTypeDto {
    @ApiProperty({example:'blue',description:'color of ticket'})
    @IsString({message:'color type string bolishi kerak'})
    readonly color:string;
    @ApiProperty({example:'biletn1',description:"name of ticket"})
    @IsString({message:'name type string bolishi kerak'})
    readonly name:string;
    @ApiProperty({example:'1',description:'id of ticket'})
    @IsOptional()
    @IsNumber({},{message:'ticket_id number bolishi kerak!'})
    readonly ticket_id:number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventTypeDto {
    @ApiProperty({example:'name1',description:'name of event-type'})
    @IsOptional()
    @IsString()
    readonly name:string;
    @ApiProperty({example:'1',description:'id of parent-event-type'})
    @IsOptional()
    @IsNumber({},{message:"parent_event_type_id number bo'lishi kerak"})
    readonly parent_event_type_id:number;
}

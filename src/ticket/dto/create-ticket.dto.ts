import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({example:'1',description:'id of event'})
    @IsNumber({},{message:"event_id type number bolishi kerak"})
    readonly event_id:number;
    @ApiProperty({example:'1',description:'id of seat'})
    @IsNumber({},{message:"seat_id type number bolishi kerak"})
    readonly seat_id:number;
    @ApiProperty({example:'10.000',description:'price'})
    @IsNumber({},{message:"price type number bolishi kerak"})
    readonly price:number;
    @ApiProperty({example:'25.000',description:'service_fee'})
    @IsNumber({},{message:"service_fee type number bolishi kerak"})
    readonly service_fee:number;
    @ApiProperty({example:'1',description:'id of status'})
    @IsNumber({},{message:"status_id type number bolishi kerak"})
    readonly status_id:number;
    @ApiProperty({example:'1',description:'id of tickettype'})
    @IsOptional()
    @IsNumber({},{message:"ticket_type type number bolishi kerak"})
    readonly ticket_type:number;
}

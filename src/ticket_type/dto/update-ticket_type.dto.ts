import { PartialType } from '@nestjs/swagger';
import { CreateTicketTypeDto } from './create-ticket_type.dto';

export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {}

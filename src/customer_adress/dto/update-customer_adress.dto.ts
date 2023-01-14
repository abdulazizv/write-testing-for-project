import { PartialType } from '@nestjs/swagger';
import { CreateCustomerAdressDto } from './create-customer_adress.dto';

export class UpdateCustomerAdressDto extends PartialType(CreateCustomerAdressDto) {}

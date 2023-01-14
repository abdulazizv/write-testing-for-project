import { PartialType } from '@nestjs/swagger';
import { CreateFlatDto } from './create-flat.dto';

export class UpdateFlatDto extends PartialType(CreateFlatDto) {}

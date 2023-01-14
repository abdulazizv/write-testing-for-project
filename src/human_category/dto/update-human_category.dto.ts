import { PartialType } from '@nestjs/swagger';
import { CreateHumanCategoryDto } from './create-human_category.dto';

export class UpdateHumanCategoryDto extends PartialType(CreateHumanCategoryDto) {}

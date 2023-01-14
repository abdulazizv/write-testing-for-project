import { Module } from '@nestjs/common';
import { CustomerCardService } from './customer_card.service';
import { CustomerCardController } from './customer_card.controller';
import { CustomerCard } from './customer_card.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([CustomerCard])],
  controllers: [CustomerCardController],
  providers: [CustomerCardService]
})
export class CustomerCardModule {}

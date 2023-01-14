import { Module } from '@nestjs/common';
import { CustomerAdressService } from './customer_adress.service';
import { CustomerAdressController } from './customer_adress.controller';
import { CustomerAdress } from './customer_adress.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([CustomerAdress])],
  controllers: [CustomerAdressController],
  providers: [CustomerAdressService]
})
export class CustomerAdressModule {}

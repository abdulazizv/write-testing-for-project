import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './country.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Country]),JwtModule],
  controllers: [CountryController],
  providers: [CountryService],
  exports:[CountryService]
})
export class CountryModule {}

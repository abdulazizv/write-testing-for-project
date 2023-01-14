import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from './language.model';

@Module({
  imports:[SequelizeModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguageModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './language.model';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private languageRepository:typeof Language) { }

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.languageRepository.create(createLanguageDto);
  }

  async findAll() {
    return await this.languageRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.languageRepository.findByPk(+id);
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const check = await this.languageRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newLanguage = await this.languageRepository.update({
            ...updateLanguageDto
        },{where:{id:id},returning:true})
        return newLanguage
  }

  async remove(id: number) {
    return await this.languageRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}

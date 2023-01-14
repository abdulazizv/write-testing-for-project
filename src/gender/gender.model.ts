import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.model';
import { HumanCategory } from '../human_category/human_category.model';

@Table({ tableName: 'gender' })
export class Gender extends Model<Gender> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'male', description: 'Type of gender' })
  @Column({
    type: DataType.STRING,
  })
  male: string;

  @ApiProperty({ example: 'female', description: 'Type of gender' })
  @Column({
    type: DataType.STRING,
  })
  female: string;

  @HasMany(() => Customer)
  custome: Customer;

  @HasMany(() => HumanCategory)
  humancategory: HumanCategory;
}

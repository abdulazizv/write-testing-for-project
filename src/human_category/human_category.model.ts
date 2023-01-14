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
import { Gender } from '../gender/gender.model';

interface HumancategorycreationAttrs {
  name: string;
  start_age: number;
  finish_age: number;
  gender: number;
}
@Table({ tableName: 'human-category' })
export class HumanCategory extends Model<
  HumanCategory,
  HumancategorycreationAttrs
> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'Human Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '0', description: 'Necha yoshdan mumkin ' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  start_age: number;

  @ApiProperty({ example: '70', description: 'Necha yoshdan keyin mumkinmas' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  finish_age: number;

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.INTEGER,
  })
  gender: number;
}

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
import { CustomerAdress } from '../customer_adress/customer_adress.model';

@Table({ tableName: 'flat' })
export class Flat extends Model<Flat> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '9', description: 'Etajlar soni' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  etaj: number;

  @ApiProperty({ example: 'yangi', description: 'condition of flat' })
  @Column({
    type: DataType.STRING,
  })
  condition: string;

  @HasMany(() => CustomerAdress)
  customera: CustomerAdress;
}

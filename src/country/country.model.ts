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

@Table({ tableName: 'country' })
export class Country extends Model<Country> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Estonia', description: 'name of country' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @HasMany(() => CustomerAdress)
  customerAdress: CustomerAdress;
}

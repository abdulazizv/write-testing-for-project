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

@Table({ tableName: 'customer-card' })
export class CustomerCard extends Model<CustomerCard> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @ApiProperty({ example: 'name', description: 'name of customercard' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'phone', description: 'phone of customercard' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: 'number', description: 'number of customercard' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;

  @ApiProperty({ example: '2024', description: 'length of customercard' })
  @Column({
    type: DataType.CHAR,
    allowNull: false,
  })
  year: string;

  @ApiProperty({ example: '07', description: 'length of customercard' })
  @Column({
    type: DataType.CHAR,
    allowNull: false,
  })
  month: string;

  @ApiProperty({ example: 'false', description: 'boolean of customercard' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'true', description: 'boolean of customercard' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main: boolean;
}

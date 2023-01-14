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
import { Venue } from '../venue/venue.model';
import { Region } from '../region/region.model';
import { CustomerAdress } from '../customer_adress/customer_adress.model';

@Table({ tableName: 'districts' })
export class District extends Model<District> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Chilonzor', description: 'name of district' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @HasMany(() => Venue)
  venue: Venue;

  @HasMany(() => CustomerAdress)
  customer: CustomerAdress;
}

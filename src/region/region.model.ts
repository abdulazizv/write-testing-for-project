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
import { District } from '../district/district.model';
import { CustomerAdress } from '../customer_adress/customer_adress.model';

@Table({ tableName: 'regions' })
export class Region extends Model<Region> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Toshkent', description: 'name of region' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '01', description: 'postpone of region' })
  @Column({
    type: DataType.SMALLINT,
  })
  postpone: number;

  @HasMany(() => Venue)
  venue: Venue;

  @HasMany(() => District)
  district: District;

  @HasMany(() => CustomerAdress)
  customera: CustomerAdress;
}

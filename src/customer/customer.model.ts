import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../gender/gender.model';
import { Language } from '../language/language.model';
import { CustomerAdress } from '../customer_adress/customer_adress.model';
import { CustomerCard } from '../customer_card/customer_card.model';
import { Cart } from '../cart/cart.model';

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Name1', description: 'name of customer' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'lastName1', description: 'Lastname of customer' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: '+998 90 023 12 14',
    description: 'phone number  of customer',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: '**********',
    description: 'hashed password of customer',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({ example: 'name@email.com', description: 'email  of customer' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: '12.10.2022', description: 'birth_date of customer' })
  @Column({
    type: DataType.DATE,
  })
  birth_date: string;

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.INTEGER,
  })
  gender: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  lang_id: number;

  @ApiProperty({
    example: '**********',
    description: 'hashed token of customer',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @HasOne(() => CustomerAdress)
  customerAdress: CustomerAdress;

  @HasMany(() => CustomerCard)
  customercard: CustomerCard;

  @HasMany(() => Cart)
  cart: Cart;
}

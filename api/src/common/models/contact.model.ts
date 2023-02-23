import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import Address from './address.model';
import Email from './email.model';
import Phone from './phone.model';
import User from './user.model';

@Table({ underscored: true, tableName: 'contacts' })
export default class Contact extends Model {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  declare userId: string;

  @AllowNull(false)
  @Column
  declare firstName: string;

  @AllowNull(false)
  @Column
  declare lastName: string;

  @HasMany(() => Email)
  declare emails: Email[];

  @HasMany(() => Phone)
  declare phones: Phone[];

  @HasMany(() => Address)
  declare addresses: Address[];
}

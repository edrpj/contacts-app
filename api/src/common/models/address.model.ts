import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Contact from './contact.model';

@Table({ underscored: true, tableName: 'addresses' })
export default class Address extends Model {
  @AllowNull(false)
  @ForeignKey(() => Contact)
  @Column
  declare contactId: string;

  @AllowNull(false)
  @Column
  declare address: string;

  @BelongsTo(() => Contact)
  declare contact: Contact;
}

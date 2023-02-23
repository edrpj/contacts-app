import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Contact from './contact.model';

@Table({ underscored: true, tableName: 'phones' })
export default class Phone extends Model {
  @AllowNull(false)
  @ForeignKey(() => Contact)
  @Column
  declare contactId: string;

  @AllowNull(false)
  @Column
  declare phone: string;

  @BelongsTo(() => Contact)
  declare contact: Contact;
}

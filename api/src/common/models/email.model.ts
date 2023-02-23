import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import Contact from './contact.model';

@Table({ underscored: true, tableName: 'emails' })
export default class Email extends Model {
  @AllowNull(false)
  @ForeignKey(() => Contact)
  @Column
  declare contactId: string;

  @AllowNull(false)
  @Column
  declare email: string;

  @BelongsTo(() => Contact)
  declare contact: Contact;
}

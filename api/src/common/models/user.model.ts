import { Model, Table, Column, AllowNull } from 'sequelize-typescript';

@Table({ underscored: true, tableName: 'users' })
export default class User extends Model {
  @AllowNull(false)
  @Column
  declare firstName: string;

  @AllowNull(false)
  @Column
  declare lastName: string;

  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;
}

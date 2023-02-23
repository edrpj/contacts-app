import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomResponse } from 'src/common/interfaces/response.interface';
import * as bcrypt from 'bcrypt';
import User from 'src/common/models/user.model';
import { UserInitialization } from './interfaces/user.interface';
import { AuthenticatedUser } from 'src/common/interfaces/auth-user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(
    userInitialization: UserInitialization,
  ): Promise<CustomResponse | AuthenticatedUser> {
    let response: CustomResponse;
    const { firstName, lastName, email, password } = userInitialization;

    const user = await this.getUserByEmail(email);

    if (user) {
      response = {
        ok: false,
        msg: 'Ya existe un usuario registrado con ese email',
      };

      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(password, 10);

    const { id } = await this.userModel.create(
      {
        firstName,
        lastName,
        email,
        password: hash,
      },
      { raw: true },
    );

    return {
      id,
      firstName,
      lastName,
      email,
    };
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ where: { email }, raw: true });
  }
}

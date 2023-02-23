import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/bussiness/users/users.service';
import { AuthenticatedUser } from 'src/common/interfaces/auth-user.interface';
import { CustomResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, createdAt, updatedAt, ...rest } = user;

      return rest as AuthenticatedUser;
    }
    return null;
  }

  async login(user: AuthenticatedUser): Promise<CustomResponse> {
    const { id: userId, firstName, lastName, email } = user;

    const payload = { sub: userId, firstName, lastName, email };
    return {
      ok: true,
      msg: 'Usuario autenticado correctamente',
      payload: {
        token: this.jwtService.sign(payload),
        user: {
          id: userId,
          firstName,
          lastName,
          email,
        },
      },
    };
  }

  async createUser(user: any): Promise<CustomResponse> {
    const userCreated = await this.usersService.createUser(user);

    const loginResponse = await this.login(userCreated as AuthenticatedUser);
    loginResponse.msg = 'Usuario registrado y autenticado correctamente';
    return loginResponse;
  }
}

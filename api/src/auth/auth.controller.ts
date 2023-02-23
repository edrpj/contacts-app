import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomResponse } from 'src/common/interfaces/response.interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guards';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<CustomResponse> {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando autenticar al usuario',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CustomResponse> {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (error) {
      let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const response = {
        ok: false,
        msg: 'Ha ocurrido un error intentando crear el usuario. Por favor, intentelo nuevamente',
      };

      if (error.status === 400) {
        status = 400;
        response.msg = error.response.msg;
      }

      throw new HttpException(response, status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/validate-token')
  async validateToken(@Request() req: any): Promise<CustomResponse> {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando validar el token',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

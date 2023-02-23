import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomResponse } from 'src/common/interfaces/response.interface';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('api/v1/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @Request() req: any,
  ): Promise<CustomResponse> {
    try {
      return await this.contactsService.createContact(
        createContactDto,
        req.user.id,
      );
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando guardar el contacto',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllContacts(@Request() req: any): Promise<CustomResponse> {
    try {
      return this.contactsService.getAllContacts(req.user.id);
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando obtener todos los contactos',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getContact(
    @Request() req: any,
    @Param() params: any,
  ): Promise<CustomResponse> {
    try {
      return this.contactsService.getContact(req.user.id, params.id);
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando obtener el contacto deseado',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateContact(
    @Param() params: any,
    @Request() req: any,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<CustomResponse> {
    return this.contactsService.updateContact(
      req.user.id,
      params.id,
      updateContactDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteContact(
    @Request() req: any,
    @Param() params: any,
  ): Promise<CustomResponse> {
    try {
      return this.contactsService.deleteContact(req.user.id, params.id);
    } catch (error) {
      console.log(error);
      const errorResponse = {
        ok: false,
        msg: 'Ha ocurrido un error intentando eliminar el contacto deseado',
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

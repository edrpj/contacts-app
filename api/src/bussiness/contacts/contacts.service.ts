import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomResponse } from 'src/common/interfaces/response.interface';
import Address from 'src/common/models/address.model';
import Contact from 'src/common/models/contact.model';
import Email from 'src/common/models/email.model';
import Phone from 'src/common/models/phone.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact) private readonly contactModel: typeof Contact,
    @InjectModel(Email) private readonly emailModel: typeof Email,
    @InjectModel(Phone) private readonly phoneModel: typeof Phone,
    @InjectModel(Address) private readonly addressModel: typeof Address,
  ) {}

  async createContact(
    createContactDto: CreateContactDto,
    userId: number,
  ): Promise<CustomResponse> {
    const { firstName, lastName, emails, phones, addresses } = createContactDto;

    const { id: contactId } = await this.contactModel.create({
      userId,
      firstName,
      lastName,
    });

    for (const emailObject of emails) {
      const { email } = emailObject;
      await this.emailModel.create({ contactId, email });
    }

    for (const phoneObject of phones) {
      const { phone } = phoneObject;
      await this.phoneModel.create({ contactId, phone });
    }

    for (const addressObject of addresses) {
      const { address } = addressObject;
      await this.addressModel.create({ contactId, address });
    }

    return {
      ok: true,
      msg: 'Contacto creado satisfactoriamente',
    };
  }

  async getAllContacts(userId: number): Promise<CustomResponse> {
    const contacts = await this.contactModel.findAll({
      where: { userId },
      include: [Email, Phone, Address],
    });

    return {
      ok: true,
      msg: 'Contactos obtenidos satisfactoriamente',
      payload: contacts,
    };
  }

  async getContact(userId: number, contactId: number): Promise<CustomResponse> {
    const contact = await this.contactModel.findOne({
      where: { id: contactId, userId },
      include: [Email, Phone, Address],
    });

    if (!contact) {
      return {
        ok: false,
        msg: 'No existe un contacto asociado a este id para este usuario',
      };
    }

    return {
      ok: true,
      msg: 'Contacto obtenido satisfactoriamente',
      payload: contact,
    };
  }

  async updateContact(
    userId: number,
    contactId: number,
    updateContactDto: UpdateContactDto,
  ): Promise<CustomResponse> {
    const {
      firstName,
      lastName,
      emails,
      phones,
      addresses,
      phoneSqlIds,
      emailSqlIds,
      addressSqlIds,
    } = updateContactDto;

    await this.contactModel.bulkCreate(
      [{ id: contactId, userId, firstName, lastName }],
      {
        updateOnDuplicate: ['firstName', 'lastName'],
      },
    );

    for (const emailObject of emails) {
      const { emailId, email } = emailObject;
      await this.emailModel.bulkCreate([{ id: emailId, contactId, email }], {
        updateOnDuplicate: ['email'],
      });
    }

    for (const phoneObject of phones) {
      const { phoneId, phone } = phoneObject;
      await this.phoneModel.bulkCreate([{ id: phoneId, contactId, phone }], {
        updateOnDuplicate: ['phone'],
      });
    }

    for (const addressObject of addresses) {
      const { addressId, address } = addressObject;
      await this.addressModel.bulkCreate(
        [{ id: addressId, contactId, address }],
        {
          updateOnDuplicate: ['address'],
        },
      );
    }

    if (phoneSqlIds && phoneSqlIds.length > 0) {
      for (const id of phoneSqlIds) {
        if (id < 0) continue;

        await this.phoneModel.destroy({ where: { id } });
      }
    }

    if (emailSqlIds && emailSqlIds.length > 0) {
      for (const id of emailSqlIds) {
        if (id < 0) continue;

        await this.emailModel.destroy({ where: { id } });
      }
    }

    if (addressSqlIds && addressSqlIds.length > 0) {
      for (const id of addressSqlIds) {
        if (id < 0) continue;

        await this.addressModel.destroy({ where: { id } });
      }
    }

    return {
      ok: true,
      msg: 'Contacto actualizado correctamente',
    };
  }

  async deleteContact(
    userId: number,
    contactId: number,
  ): Promise<CustomResponse> {
    await this.emailModel.destroy({ where: { contactId } });
    await this.phoneModel.destroy({ where: { contactId } });
    await this.addressModel.destroy({ where: { contactId } });
    await this.contactModel.destroy({ where: { userId, id: contactId } });

    return {
      ok: true,
      msg: 'Contacto elimiando satisfactoriamente',
    };
  }
}

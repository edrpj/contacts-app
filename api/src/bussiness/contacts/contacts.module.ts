import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Address from 'src/common/models/address.model';
import Contact from 'src/common/models/contact.model';
import Email from 'src/common/models/email.model';
import Phone from 'src/common/models/phone.model';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [SequelizeModule.forFeature([Contact, Email, Phone, Address])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}

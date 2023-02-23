import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateContactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Emails are required' })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EmailDto)
  emails: EmailDto[];

  @IsNotEmpty({ message: 'Phones are required' })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones: PhoneDto[];

  @IsNotEmpty({ message: 'Addresses are required' })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @IsOptional()
  @IsNumber({}, { each: true })
  phoneSqlIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  emailSqlIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  addressSqlIds: number[];
}

class EmailDto {
  @IsOptional()
  @IsNumber()
  emailId: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}

class PhoneDto {
  @IsOptional()
  @IsNumber()
  phoneId: number;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

class AddressDto {
  @IsOptional()
  @IsNumber()
  addressId: number;

  @IsNotEmpty()
  @IsString()
  address: string;
}

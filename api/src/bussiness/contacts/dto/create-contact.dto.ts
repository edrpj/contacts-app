import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => EmailDto)
  emails: EmailDto[];

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => PhoneDto)
  phones: PhoneDto[];

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

class EmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

class PhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}

class AddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}


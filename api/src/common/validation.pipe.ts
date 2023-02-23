import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      console.log(error);
      const { response } = error;
      const errorValidationResponse = {
        ok: false,
        msg: response.message,
      };
      if (error instanceof BadRequestException) {
        throw new BadRequestException(errorValidationResponse);
      }
    }
  }
}

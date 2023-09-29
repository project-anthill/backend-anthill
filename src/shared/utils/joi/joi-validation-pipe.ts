import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { messagesJoi } from './joi-messages-error';
  
  @Injectable()
  export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
  
    transform(value: any, metadata: ArgumentMetadata) {
      if (metadata.type === 'body') {
        const { error } = this.schema.validate(value, {
          messages: messagesJoi,
        });
        if (error?.details?.length > 0) {
          const message = error.message.replace(/"/gi, '*');
          throw new BadRequestException(message);
        }
      }
  
      return value;
    }
  }
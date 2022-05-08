import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationFilePipe implements PipeTransform<string, object> {
  transform(value: any, metadata: ArgumentMetadata): object {
    if (!value) {
      throw new BadRequestException('Include a file');
    }

    return value;
  }
}

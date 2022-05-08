import { SortTypes } from '@common/enums';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseSortPipe implements PipeTransform<string, object> {
  transform(value: string, metadata: ArgumentMetadata): object {
    if (!value) {
      return {};
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed for sorting');
    }

    const order = value?.split(',').reduce((previous, current) => {
      const orderKey = current.replace(/^\-/, '');
      return {
        ...previous,
        [orderKey]: current.startsWith('-') ? SortTypes.DESC : SortTypes.ASC,
      };
    }, {});

    if (!order) {
      throw new BadRequestException('Validation failed for sorting');
    }
    return order;
  }
}

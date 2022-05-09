import { HttpException, HttpStatus } from '@nestjs/common';

export class IncompleteCategoriesException extends HttpException {
  constructor() {
    super('Cannot find some categories', HttpStatus.BAD_REQUEST);
  }
}

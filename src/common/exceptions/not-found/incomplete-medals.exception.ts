import { HttpException, HttpStatus } from '@nestjs/common';

export class IncompleteMedalsException extends HttpException {
  constructor() {
    super('Cannot find some medals', HttpStatus.BAD_REQUEST);
  }
}

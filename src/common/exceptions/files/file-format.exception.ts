import { HttpException, HttpStatus } from '@nestjs/common';

export class FileFormatException extends HttpException {
  constructor() {
    super('Only accepts images formats', HttpStatus.BAD_REQUEST);
  }
}

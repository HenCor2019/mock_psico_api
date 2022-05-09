import { HttpException, HttpStatus } from '@nestjs/common';

export class IncompleteRolesException extends HttpException {
  constructor() {
    super('Cannot find some roles', HttpStatus.BAD_REQUEST);
  }
}

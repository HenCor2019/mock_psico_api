import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Cannot find the user', HttpStatus.NOT_FOUND);
  }
}

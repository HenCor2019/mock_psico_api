import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginException extends HttpException {
  constructor() {
    super('The credentials you entered are incorrect', HttpStatus.BAD_REQUEST);
  }
}

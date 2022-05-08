import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginException extends HttpException {
  constructor() {
    super(
      'The credentials you entered are incorrect. Reminder: passwords are case sensitive.',
      HttpStatus.BAD_REQUEST,
    );
  }
}

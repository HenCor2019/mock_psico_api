import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistUserException extends HttpException {
  constructor() {
    super('Email is already taken', HttpStatus.NOT_FOUND);
  }
}

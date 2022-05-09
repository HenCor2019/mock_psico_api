import { HttpException, HttpStatus } from '@nestjs/common';

export class MoodNotFoundException extends HttpException {
  constructor() {
    super('Cannot find the mood', HttpStatus.NOT_FOUND);
  }
}

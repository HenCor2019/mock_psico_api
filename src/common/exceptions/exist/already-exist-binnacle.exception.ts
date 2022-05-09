import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistBinnacleException extends HttpException {
  constructor() {
    super(
      'You Already has a binnacle create, remember: One binnacle per day',
      HttpStatus.NOT_FOUND,
    );
  }
}

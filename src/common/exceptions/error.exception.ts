import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

type ErrorResponse = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ErrorResponse;
    if (typeof exceptionResponse === 'string') {
      return response.status(status).json({
        success: false,
        content: null,
        messages: [exceptionResponse],
      });
    }
    const { message = [] } = exceptionResponse;
    const messages = Array.isArray(message) ? message : [message];

    response.status(status).json({
      success: false,
      content: null,
      messages,
    });
  }
}

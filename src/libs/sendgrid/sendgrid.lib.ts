import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGridMailer from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  private mail: string;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get('SENDGRID_API_KEY');
    this.mail = this.configService.get('SENDGRID_MAIL');
    SendGridMailer.setApiKey(apiKey);
  }
}

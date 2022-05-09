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

  async requestPassword(email: string, token: string) {
    const { BASE_URL } = process.env;

    const HTMLEmail = `
     <p>Aca ira un email asi bien potente</p>
     <a href="${BASE_URL}/restore?token=${token}">Restore</a>
    `;

    const restoreEmail = {
      to: email,
      from: this.mail,
      subject: 'Psico Amigos - Restore password',
      html: HTMLEmail,
    };

    await SendGridMailer.send(restoreEmail);
  }
}

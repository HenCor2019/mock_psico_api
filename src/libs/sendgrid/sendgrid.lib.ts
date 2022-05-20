import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGridMailer from '@sendgrid/mail';
import { User } from 'src/entities';

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

  async sendProfessionalMail(user: User, professional: User, about: string) {
    const HTMLEmail = `
     <p>Hola wap@, te queremos decir que alguien quiere ahi tus conocimientos perrones, el/la man se llama ${user.fullname}</p>
     <p>Podes escribirle por este correo ${user.email}, ahi no contas como te fue</p>
     <p>Aca te dejo la persona un mensajito para no se, la verdad :)</p>
     ${about}
     <p>Sale pues, ahi nos vidrios luego</p>
    `;

    const helpEmail = {
      to: professional.email,
      from: this.mail,
      subject: 'Psico Amigos - Help needed',
      html: HTMLEmail,
    };

    await SendGridMailer.send(helpEmail);
  }
}

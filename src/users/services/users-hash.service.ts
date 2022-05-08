import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class UsersHashService {
  async hashData(data: string) {
    return hash(data);
  }

  async compareData(plainData: string, encryptedData: string) {
    return verify(encryptedData, plainData);
  }
}

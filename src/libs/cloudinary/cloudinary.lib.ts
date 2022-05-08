import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    Cloudinary.v2.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async upload(imagePath: string) {
    return Cloudinary.v2.uploader.upload(imagePath, {
      folder: this.configService.get('CLOUDINARY_FOLDER'),
    });
  }
}

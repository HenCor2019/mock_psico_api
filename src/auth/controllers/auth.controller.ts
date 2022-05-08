import { HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';

import { User } from '@common/decorators';
import { GoogleGuard } from '@common/guards';
import { GoogleUser } from '@common/interfaces';

import { AuthService } from '@auth/services/auth.service';

import { BadRequestSwagger, LoginSwagger } from '@swagger';

import { Request } from 'express';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async login(@Req() req: Request) {} // eslint-disable-line

  @Get('redirect')
  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Login a user',
    type: LoginSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource for user',
    type: BadRequestSwagger,
  })
  async loginRedirect(@User() user: GoogleUser) {
    return this.authService.login(user);
  }
}

import { Body, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';

import { User as UserEntity } from '@entities';

import { User } from '@common/decorators';
import { GoogleGuard, JwtPasswordAuthGuard } from '@common/guards';
import { GoogleUser } from '@common/interfaces';

import { AuthService } from '@auth/services/auth.service';

import { BadRequestSwagger, LoginSwagger } from '@swagger';

import { Request } from 'express';
import { RequestPasswordDto, ResetPasswordDto } from '@auth/dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async login(@Req() req: Request) {} // eslint-disable-line

  @Get('redirect')
  @UseGuards(GoogleGuard)
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

  @Post('request-password')
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
  async requestPassword(@Body() requestPasswordDto: RequestPasswordDto) {
    return this.authService.requestPassword(requestPasswordDto.email);
  }

  @Patch('reset-password')
  @UseGuards(JwtPasswordAuthGuard)
  @ApiBearerAuth()
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
  async resetPassword(
    @User() user: UserEntity,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(user, resetPasswordDto.password);
  }
}

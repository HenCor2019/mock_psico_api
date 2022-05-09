import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles, User } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import { JwtAuthGuard, RolesGuard, TipsPermissionGuard } from '@common/guards';

import { User as UserEntity } from '@entities';

import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { TipsService } from '@tips/services/tips.service';

@ApiTags('Tips')
@Controller('users')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get('tips')
  findAllTips() {
    return this.tipsService.findAll();
  }

  @Get('me/tips')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findMyTips(@User() user: UserEntity) {
    return this.tipsService.findByUser(user);
  }

  @Post('me/tips')
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTipDto: CreateTipDto, @User() user: UserEntity) {
    return this.tipsService.create(user, createTipDto);
  }

  @Patch('me/tips/:tipId')
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, TipsPermissionGuard)
  @ApiBearerAuth()
  update(
    @Param('tipId', ParseIntPipe) id: number,
    @Body() updateTipDto: UpdateTipDto,
  ) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @Delete('me/tips/:tipId')
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, TipsPermissionGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tipId', ParseIntPipe) id: number) {
    return this.tipsService.remove(+id);
  }
}

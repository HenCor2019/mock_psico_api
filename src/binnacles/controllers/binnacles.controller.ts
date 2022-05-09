import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BinnaclesService } from '@binnacles/services/binnacles.service';
import { CreateBinnacleDto } from '@binnacles/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, User } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import {
  BinnaclesPermissionGuard,
  JwtAuthGuard,
  RolesGuard,
} from '@common/guards';
import { User as UserEntity } from '@entities';

@ApiTags('Binnacles')
@Controller('users')
export class BinnaclesController {
  constructor(private readonly binnaclesService: BinnaclesService) {}

  @Post('me/binnacles')
  @ApiBearerAuth()
  @Roles(AppRoles.USER, AppRoles.MODERATOR, AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body() createBinnacleDto: CreateBinnacleDto,
    @User() user: UserEntity,
  ) {
    return this.binnaclesService.create(user, createBinnacleDto);
  }

  @Get('me/binnacles')
  @ApiBearerAuth()
  @Roles(AppRoles.USER, AppRoles.MODERATOR, AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findMyBinnacles(@User() user: UserEntity) {
    return this.binnaclesService.findMyBinnacles(user);
  }

  @Get(':binnacleId')
  @ApiBearerAuth()
  @Roles(AppRoles.USER, AppRoles.MODERATOR, AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, BinnaclesPermissionGuard)
  findById(@Param('binnacleId', ParseIntPipe) id: number) {
    return this.binnaclesService.findById(id);
  }
}

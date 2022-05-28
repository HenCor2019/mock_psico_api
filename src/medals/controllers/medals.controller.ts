import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';

import { MedalsService } from '@medals/services/medals.service';

@ApiTags('Medals')
@Controller('/api/v1/users')
export class MedalsController {
  constructor(private readonly medalsService: MedalsService) {}

  @Get('medals')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async find() {
    return this.medalsService.find();
  }
}

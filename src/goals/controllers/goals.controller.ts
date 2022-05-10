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
import { GoalsPermissionGuard, JwtAuthGuard, RolesGuard } from '@common/guards';

import { User as UserEntity } from '@entities';

import { CreateGoalDto, UpdateGoalDto } from '@goals/dto';
import { GoalsService } from '@goals/services/goals.service';

@ApiTags('Goals')
@Controller('/api/v1/users')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get('me/goals')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findMyGoals(@User() user: UserEntity) {
    return this.goalsService.findMyGoals(user);
  }

  @Post('me/goals')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createGoals(
    @Body() createGoalDto: CreateGoalDto,
    @User() user: UserEntity,
  ) {
    return this.goalsService.create(user, createGoalDto);
  }

  @Patch('me/:goalId/goals')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, GoalsPermissionGuard)
  async updateGoals(
    @Param('goalId', ParseIntPipe) id: number,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Patch('me/:goalId/goals/toggle-complete')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, GoalsPermissionGuard)
  async toggleComplete(@Param('goalId', ParseIntPipe) id: number) {
    return this.goalsService.toggleComplete(id);
  }

  @Delete('me/:goalId/goals')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, GoalsPermissionGuard)
  async removeGoals(@Param('goalId', ParseIntPipe) id: number) {
    this.goalsService.remove(id);
  }
}

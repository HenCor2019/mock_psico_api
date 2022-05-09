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
import { TipsService } from '@tips/services/tips.service';
import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '@entities';
import { User, Roles } from '@common/decorators';
import { JwtAuthGuard, RolesGuard, TipsPermissionGuard } from '@common/guards';

@ApiTags('Tips')
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post()
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTipDto: CreateTipDto, @User() user: UserEntity) {
    return this.tipsService.create(user, createTipDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.tipsService.findAll();
  }

  @Patch(':tipId')
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard, TipsPermissionGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(
    @Param('tipId', ParseIntPipe) id: number,
    @Body() updateTipDto: UpdateTipDto,
  ) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @Delete(':tipId')
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard, TipsPermissionGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('tipId', ParseIntPipe) id: number) {
    return this.tipsService.remove(+id);
  }
}

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
} from '@nestjs/common';
import { TipsService } from '@tips/services/tips.service';
import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '@entities';
import { User, Roles } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';

@ApiTags('Tips')
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post()
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() createTipDto: CreateTipDto, @User() user: UserEntity) {
    return this.tipsService.create(user, createTipDto);
  }

  @Get()
  findAll() {
    return this.tipsService.findAll();
  }

  @Patch(':id')
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTipDto: UpdateTipDto,
    @User() user: UserEntity,
  ) {
    return this.tipsService.update(+id, updateTipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipsService.remove(+id);
  }
}

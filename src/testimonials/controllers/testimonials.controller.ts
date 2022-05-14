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
import {
  JwtAuthGuard,
  RolesGuard,
  TestimonialsPermissionGuard,
} from '@common/guards';

import { User as UserEntity } from '@entities';

import { CreateTestimonialDto, UpdateTestimonialDto } from '@testimonials/dto';
import { TestimonialsService } from '@testimonials/services/testimonials.service';

@ApiTags('Testimonials')
@Controller('/api/v1/users')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get('testimonials')
  async findAllTestimonials() {
    return this.testimonialsService.findAll();
  }

  @Get('me/testimonials')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findMyTestimonials(@User() user: UserEntity) {
    return this.testimonialsService.findByUser(user);
  }

  @Post('me/testimonials')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTestimonials(
    @Body() createTestimonialsDto: CreateTestimonialDto,
    @User() user: UserEntity,
  ) {
    return this.testimonialsService.create(user, createTestimonialsDto);
  }

  @Patch('me/testimonials/:testimonialId')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, TestimonialsPermissionGuard)
  async updateTestimonials(
    @Param('testimonialId', ParseIntPipe) id: number,
    @Body() updateTestimonialsDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(id, updateTestimonialsDto);
  }

  @Delete('me/testimonials/:testimonialId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard, TestimonialsPermissionGuard)
  async removeTestimonials(@Param('testimonialId', ParseIntPipe) id: number) {
    this.testimonialsService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateRolesDto } from '@users/dto';
import { UsersService } from '@users/services';
import { ValidationFilePipe } from '@common/pipes';
import { MulterFile } from '@common/types';
import { User as UserEntity } from '@entities';
import { FileFormatException } from '@common/exceptions';
import { Roles, User } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import {
  JwtAuthGuard,
  RolesGuard,
  TestimonialsPermissionGuard,
  TipsPermissionGuard,
} from '@common/guards';
import { TestimonialsService } from '@testimonials/services/testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from '@testimonials/dto';
import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { TipsService } from '@tips/services/tips.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly testimonialsService: TestimonialsService,
    private readonly tipsService: TipsService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullname: { type: 'string', description: 'User fullname' },
        email: { type: 'string', description: 'User email' },
        password: { type: 'string', description: 'User password' },
        file: {
          type: 'string',
          format: 'binary',
          description: 'User photo',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file) {
          return callback(new FileFormatException(), false);
        }

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new FileFormatException(), false);
        }
        callback(null, true);
      },
    }),
  )
  async signup(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile('file', new ValidationFilePipe()) file: MulterFile,
  ) {
    const savedUser = await this.usersService.create(createUserDto, file);
    return new UserEntity({ ...savedUser });
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.localLogin(loginUserDto);
  }

  @Patch('/:userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async grantRoles(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    const user = await this.usersService.grantRoles(id, updateRolesDto.roles);
    return new UserEntity({ ...user });
  }

  @Delete('/:userId/roles')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async revokeRoles(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    const user = await this.usersService.revokeRoles(id, updateRolesDto.roles);
    return new UserEntity({ ...user });
  }

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

  @Patch('me/:testimonialId/testimonials')
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

  @Delete('me/:testimonialId/testimonials')
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

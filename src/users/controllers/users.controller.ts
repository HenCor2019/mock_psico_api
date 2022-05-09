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

import { UsersService } from '@users/services';
import { CreateUserDto, LoginUserDto, UpdateRolesDto } from '@users/dto';

import { MulterFile } from '@common/types';
import { Roles, User } from '@common/decorators';
import { Medals, Roles as AppRoles } from '@common/enums';
import { ValidationFilePipe } from '@common/pipes';
import { FileFormatException } from '@common/exceptions';
import { JwtAuthGuard, RolesGuard } from '@common/guards';

import { User as UserEntity } from '@entities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @Roles(AppRoles.USER, AppRoles.MODERATOR, AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findMyInformation(@User('userId') id: number) {
    return this.usersService.findMyInformation(id);
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

  @Patch(':userId/roles')
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

  @Delete(':userId/roles')
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

  @Patch('me/medals/tips')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async grantTipsMedal(@User() user: UserEntity) {
    return this.usersService.grantMedal(user, Medals.TIPS);
  }

  @Patch('me/medals/testimonials')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async grantTestimonialsMedal(@User() user: UserEntity) {
    return this.usersService.grantMedal(user, Medals.TESTIMONIALS);
  }

  @Patch('me/medals/binnacles')
  @ApiBearerAuth()
  @Roles(
    AppRoles.USER,
    AppRoles.PSYCHOLOGIST,
    AppRoles.MODERATOR,
    AppRoles.ADMIN,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async grantBinnaclesMedal(@User() user: UserEntity) {
    return this.usersService.grantMedal(user, Medals.BINNACLES);
  }
}

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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateRolesDto } from '@users/dto';
import { UsersService } from '@users/services';
import { ValidationFilePipe } from '@common/pipes';
import { MulterFile } from '@common/types';
import { User } from '@entities';
import { FileFormatException } from '@common/exceptions';
import { Roles } from '@common/decorators';
import { Roles as AppRoles } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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
    return new User({ ...savedUser });
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.localLogin(loginUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findById(@Param('userId', ParseIntPipe) id: string) {
    const user = await this.usersService.findById(+id);
    return new User({ ...user });
  }

  @Patch('/:userId/roles')
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async grantRoles(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    const user = await this.usersService.grantRoles(id, updateRolesDto.roles);
    return new User({ ...user });
  }

  @Delete('/:userId/roles')
  @ApiBearerAuth()
  @Roles(AppRoles.MODERATOR, AppRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async revokeRoles(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    const user = await this.usersService.revokeRoles(id, updateRolesDto.roles);
    return new User({ ...user });
  }
}

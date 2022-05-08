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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@users/dto';
import { UsersService } from '@users/services';
import { ValidationFilePipe } from '@common/pipes';
import { MulterFile } from '@common/types';
import { User } from '@entities';
import { FileFormatException } from '@common/exceptions';

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

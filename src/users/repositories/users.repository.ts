import { Role, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@users/dto';
import { ILike, Repository } from 'typeorm';

//type UserToSave = CreateUserDto & { hashPassword: string; photo: string };
type UserToSave<T = CreateUserDto> = (T extends CreateUserDto
  ? Omit<T, 'password'>
  : never) & { hashPassword: string; photo: string; roles: Role[] };

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async find() {
    return this.repository.find({
      relations: ['roles'],
    });
  }

  async findById(userId: number) {
    return this.repository.findOne(userId, {
      relations: ['roles'],
    });
  }

  async findMyInformation(id: number) {
    return this.repository.findOne(
      { userId: id },
      {
        relations: ['roles', 'medals', 'testimonials', 'tips'],
      },
    );
  }

  async findByEmail(email: string) {
    return this.repository.findOne(
      { email: ILike(email) },
      {
        relations: ['roles'],
      },
    );
  }

  async updateUserPhoto(user: User, newPhoto: string) {
    return this.repository.save({ ...user, photo: newPhoto });
  }

  async save(userToSave: UserToSave) {
    const newUser = this.repository.create({
      ...userToSave,
    });

    return this.repository.save(newUser);
  }

  async update(userToUpdate: User) {
    return this.repository.save({ ...userToUpdate });
  }
}

import { Role, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, QueryUserDto } from '@users/dto';
import { ILike, In, Repository } from 'typeorm';

//type UserToSave = CreateUserDto & { hashPassword: string; photo: string };
type UserToSave<T = CreateUserDto> = (T extends CreateUserDto
  ? Omit<T, 'password'>
  : never) & {
  hashPassword: string;
  photo: string;
  roles: Role[];
  displayName: string;
};

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async find(options: QueryUserDto) {
    const { q } = options;
    const fullnameRegExp = q ?? '';
    return this.repository.find({
      where: {
        fullname: ILike(`%${fullnameRegExp}%`),
      },
      relations: ['roles', 'contacts'],
    });
  }

  async findProfessionals(options: QueryUserDto) {
    const { q } = options;
    const fullnameRegExp = q ?? '';
    const professionals = await this.repository.find({
      where: {
        fullname: ILike(`%${fullnameRegExp}%`),
      },
      relations: ['roles', 'contacts'],
    });

    return professionals.filter((professional) =>
      professional.roles.find((role) => role.role_id === 2),
    );
  }

  async findById(userId: number) {
    return this.repository.findOne(userId, {
      relations: ['roles', 'medals', 'testimonials', 'tips', 'contacts'],
    });
  }

  async findMyInformation(id: number) {
    return this.repository.findOne(
      { userId: id },
      {
        relations: [
          'roles',
          'medals',
          'testimonials',
          'testimonials.categories',
          'tips',
          'tips.categories',
          'contacts',
        ],
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

  async delete(userToDelete: User) {
    return this.repository.remove({ ...userToDelete });
  }
}

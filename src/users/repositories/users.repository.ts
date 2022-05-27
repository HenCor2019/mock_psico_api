import { Roles } from '@common/enums';
import { Category, Role, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, QueryUserDto } from '@users/dto';
import { Request } from 'src/entities/Request.entity';
import { ILike, Repository } from 'typeorm';

const queryRoles = {
  user: Roles.USER,
  professional: Roles.PSYCHOLOGIST,
};

type UserToSave<T = CreateUserDto> = (T extends CreateUserDto
  ? Omit<T, 'password'>
  : never) & {
  hashPassword: string;
  photo: string;
  roles: Role[];
  displayName: string;
};

type QuerySearchUser<T = QueryUserDto> = (T extends QueryUserDto
  ? Omit<T, 'category'>
  : never) & { category: Category };

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async find(options: QueryUserDto) {
    const { q } = options;
    const fullnameRegExp = q ?? '';
    const users = await this.repository.find({
      where: {
        fullname: ILike(`%${fullnameRegExp}%`),
      },
      relations: ['roles', 'contacts', 'specialities'],
    });

    return users.filter((user) =>
      user.roles.map((role) => role.role).includes(queryRoles[options.role]),
    );
  }

  async findProfessionals(options: QuerySearchUser) {
    const { q, category } = options;
    const fullnameRegExp = q ?? '';
    const professionals = await this.repository.find({
      where: {
        fullname: ILike(`%${fullnameRegExp}%`),
      },
      relations: ['roles', 'contacts', 'specialities'],
    });

    return professionals.filter(
      (professional) =>
        professional.roles.find((role) => role.role_id === 2) &&
        professional.specialities.find(({ name }) =>
          category ? name === category.name : true,
        ),
    );
  }

  async findById(userId: number) {
    return this.repository.findOne(userId, {
      relations: [
        'roles',
        'medals',
        'testimonials',
        'tips',
        'contacts',
        'specialities',
      ],
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
          'specialities',
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

  async saveRequest(requestToSave: {
    userId: User;
    specialities: Category[];
    professionalSlogan: string;
    cv: string;
  }) {
    const newRequest = this.requestRepository.create({
      ...requestToSave,
    });

    return this.requestRepository.save(newRequest);
  }

  async findRequests() {
    return this.requestRepository.find({
      relations: ['userId', 'specialities'],
    });
  }

  async findUserRequest(userId: User) {
    return this.requestRepository.findOne(
      { userId: userId },
      { relations: ['specialities'] },
    );
  }

  async deleteRequest(requestToDelete: Request) {
    this.requestRepository.remove(requestToDelete);
  }

  async update(userToUpdate: User) {
    return this.repository.save({ ...userToUpdate });
  }

  async delete(userToDelete: User) {
    return this.repository.remove({ ...userToDelete });
  }
}

import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@users/dto';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async find() {
    return this.repository.find({
      relations: ['roles', 'openings', 'candidates', 'company_id'],
    });
  }

  async findById(userId: number) {
    return this.repository.findOne(userId, {
      relations: ['roles', 'openings', 'candidates', 'company_id'],
    });
  }

  async findByEmail(email: string) {
    return this.repository.findOne(
      { email: ILike(email) },
      {
        relations: ['roles', 'openings', 'candidates', 'company_id'],
      },
    );
  }

  async updateUserPhoto(user: User, newPhoto: string) {
    return this.repository.save({ ...user, photo: newPhoto });
  }

  async save(userToSave: CreateUserDto) {
    const newUser = this.repository.create({
      ...userToSave,
    });

    return this.repository.save(newUser);
  }

  async update(userToUpdate: User) {
    return this.repository.save({ ...userToUpdate });
  }

  async remove(userToRemove: User) {
    this.repository.remove(userToRemove);
  }
}

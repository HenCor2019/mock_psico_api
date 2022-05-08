import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Expose()
  @Column({ length: 50 })
  fullname: string;

  @Expose()
  @Column({ length: 50 })
  email: string;

  @Exclude()
  @Column({ length: 200 })
  hashPassword: string;

  @Expose()
  @Column({ length: 150 })
  photo: string;

  @Exclude()
  @Column({ default: null, length: 200 })
  hashRefreshToken: string;

  @Expose()
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { User } from './User.entity';

@Entity()
export class Request {
  @Expose()
  @PrimaryGeneratedColumn()
  requesId: number;

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable()
  specialities: Category[];

  @Expose()
  @Column({ length: 200, default: '' })
  professionalSlogan: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.requests, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: User;

  @Expose()
  @Column({ length: '200' })
  cv: string;

  constructor(partial: Partial<Request>) {
    Object.assign(this, partial);
  }
}

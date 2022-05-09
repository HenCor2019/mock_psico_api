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

@Entity('Testimonials')
export class Testimony {
  @PrimaryGeneratedColumn()
  testimonyId: number;

  @Expose()
  @Column({ length: 50 })
  title: string;

  @Expose()
  @Column({ length: 150 })
  description: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.testimonials, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  userId: User;

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  constructor(partial: Partial<Testimony>) {
    Object.assign(this, partial);
  }
}

import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Binnacle } from './Binnacle.entity';
import { Goal } from './Goal.entity';
import { Role } from './Role.entity';
import { Testimony } from './Testimony.entity';
import { Tip } from './Tip.entity';

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
  @OneToMany(() => Testimony, (testimony) => testimony.userId)
  testimonials: Testimony[];

  @Expose()
  @OneToMany(() => Tip, (tip) => tip.userId)
  tips: Tip[];

  @Expose()
  @OneToMany(() => Goal, (goal) => goal.userId)
  goals: Goal[];

  @Expose()
  @OneToMany(() => Binnacle, (binnacle) => binnacle.userId)
  binnacles: Binnacle[];

  @Expose()
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

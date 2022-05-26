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
import { Category } from './Category.entity';
import { Goal } from './Goal.entity';
import { Medal } from './Medal.entity';
import { Role } from './Role.entity';
import { Testimony } from './Testimony.entity';
import { Tip } from './Tip.entity';
import { Request } from './Request.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Expose()
  @Column({ length: 50 })
  fullname: string;

  @Expose()
  @Column({ length: 50, default: '' })
  displayName: string;

  @Expose()
  @Column({ length: 50 })
  email: string;

  @Expose()
  @Column({ length: 200, default: '' })
  aboutMe: string;

  @Expose()
  @Column({ length: 200, default: '' })
  professionalSlogan: string;

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
  @OneToMany(() => Request, (request) => request.userId)
  requests: Request[];

  @Expose()
  @OneToMany(() => Binnacle, (binnacle) => binnacle.userId)
  binnacles: Binnacle[];

  @Expose()
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Expose()
  @ManyToMany(() => Medal)
  @JoinTable()
  medals: Medal[];

  @Exclude({})
  @ManyToMany(() => User)
  @JoinTable()
  contacts: User[];

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable()
  specialities: Category[];

  constructor(partial: Partial<User>) {
    Object.assign(this, { ...partial, demans: partial?.contacts.length });
  }
}

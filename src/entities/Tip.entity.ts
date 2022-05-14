import { Exclude, Expose } from 'class-transformer';
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

@Entity('Tips')
export class Tip {
  @PrimaryGeneratedColumn()
  tipId: number;

  @Expose({ name: 'title' })
  @Column({ length: 200 })
  description: string;

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Exclude()
  @ManyToOne(() => User, (user) => user.tips, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  userId: User;

  constructor(partial: Partial<Tip>) {
    Object.assign(this, partial);
  }
}

import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Exclude()
  @ManyToOne(() => User, (user) => user.testimonials, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  userId: User;

  constructor(partial: Partial<Testimony>) {
    Object.assign(this, partial);
  }
}

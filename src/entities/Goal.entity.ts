import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('Goals')
export class Goal {
  @PrimaryGeneratedColumn()
  goalId: number;

  @Expose()
  @Column({ length: 50 })
  title: string;

  @Expose()
  @Column({ length: 200 })
  description: string;

  @Expose()
  @Column({ default: new Date() })
  startDate: Date;

  @Expose()
  @Column()
  finishDate: Date;

  @Expose()
  @Column({ default: false })
  completed: boolean;

  @Expose()
  @ManyToOne(() => User, (user) => user.goals, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: User;

  constructor(partial: Partial<Goal>) {
    Object.assign(this, partial);
  }
}

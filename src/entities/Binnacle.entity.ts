import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mood } from './Mood.entity';
import { User } from './User.entity';

@Entity('Binnacles')
export class Binnacle {
  @PrimaryGeneratedColumn()
  binnacleId: number;

  @Expose()
  @Column({ length: 200 })
  thought: string;

  @Expose()
  @Column({ type: 'date' })
  binnacleDate: Date;

  @Expose()
  @ManyToOne(() => User, (user) => user.binnacles, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: User;

  @Expose()
  @ManyToOne(() => Mood, (mood) => mood.binnacles, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  moodId: Mood;

  constructor(partial: Partial<Binnacle>) {
    Object.assign(this, partial);
  }
}

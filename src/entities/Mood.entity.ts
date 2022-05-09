import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Binnacle } from './Binnacle.entity';

@Entity('Moods')
export class Mood {
  @PrimaryGeneratedColumn()
  moodId: number;

  @Expose()
  @Column({ length: 50 })
  mood: string;

  @Expose()
  @Column({ length: 200 })
  url: string;

  @Expose()
  @OneToMany(() => Binnacle, (binnacle) => binnacle.moodId)
  binnacles: Binnacle;

  constructor(partial: Partial<Mood>) {
    Object.assign(this, partial);
  }
}

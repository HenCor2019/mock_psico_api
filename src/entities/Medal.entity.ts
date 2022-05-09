import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Medals')
export class Medal {
  @PrimaryGeneratedColumn()
  medalId: number;

  @Expose()
  @Column({ length: 50 })
  medal: string;

  @Expose()
  @Column({ length: 200 })
  thumbnail: string;

  constructor(partial: Partial<Medal>) {
    Object.assign(this, partial);
  }
}

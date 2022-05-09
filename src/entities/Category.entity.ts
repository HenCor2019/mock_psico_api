import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tip } from './Tip.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Expose()
  @Column({ length: 50 })
  name: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
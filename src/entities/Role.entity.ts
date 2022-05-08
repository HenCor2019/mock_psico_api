import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class Role {
  @Expose()
  @PrimaryGeneratedColumn()
  role_id: number;

  @Expose()
  @Column({ length: 50 })
  role: string;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}

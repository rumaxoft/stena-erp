import { RoleModel } from '@/core/domain/models/role';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RoleEntity implements RoleModel {
  @PrimaryColumn()
  id: UniqueId;
  @Column({ type: 'timestamptz' })
  createdAt: Date;
  @Column({ type: 'timestamptz' })
  updatedAt: Date;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  isActive: boolean;
  @Column()
  version: number;
}

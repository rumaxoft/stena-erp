import { UserModel } from '@/core/domain/models/user';
import { RoleEntity } from '../role/role.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryColumn()
  id: UniqueId;
  @Column({ type: 'timestamptz' })
  createdAt: Date;
  @Column({ type: 'timestamptz' })
  updatedAt: Date;
  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  middleName: string;
  @Column({
    nullable: true,
  })
  lastName: string;
  @Column({
    nullable: true,
  })
  additionalInfo: string;
  @Column({
    nullable: true,
  })
  email: string;
  @Column()
  emailVerified: boolean;
  @Column({
    nullable: true,
  })
  mobile: string;
  @Column()
  mobileVerified: boolean;
  @Column({
    nullable: true,
  })
  hashedPassword: string;
  @Column({
    nullable: true,
  })
  salt: string;
  @Column()
  version: number;
  @ManyToOne(() => RoleEntity)
  role: RoleEntity;
}

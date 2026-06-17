import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['id1', 'id2'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id1: string;

  @Column()
  id2: string;

  @CreateDateColumn()
  createdAt: Date;

  static create(id1: string, id2: string): User {
    const user = new User();

    user.id1 = id1;
    user.id2 = id2;

    return user;
  }
}

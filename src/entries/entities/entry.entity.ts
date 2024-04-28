import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column()
  currency: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  date: Date;

  @Column()
  photo: string;

  @ManyToOne(() => User, (user) => user.entries, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.entries, {
    eager: true,
  })
  category: Category;
}

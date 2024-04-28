import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../role.enum';
import { Entry } from 'src/entries/entities/entry.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthDate: Date;
  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;

  @ManyToOne(() => Entry, (entry) => entry.user)
  entries: Entry[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

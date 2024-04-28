import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
export class CreateEntryDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  category: Category;

  photo: any;

  user: User;

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    descripiton: string,
    category: Category,
    photo?: any,
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.description = descripiton;
    this.category = category;
    this.photo = photo;
  }
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToOne(() => Book, (book) => book.genres, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'book_id' })
  book_id?: Book;

  constructor(
    name: string,
  ) {
    this.name = name;
  }
}
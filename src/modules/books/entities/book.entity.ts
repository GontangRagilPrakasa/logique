import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.entity";

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  title: string;

  @Column()
  author: string;

  @Column()
  publishedYear: number;

  @OneToMany(() => Genre, (genre) => genre.book_id)
  genres?: Genre[];

  @Column()
  stock: number;

  constructor(
    id: string,
    title: string,
    author: string,
    publishedYear: number,
    stock: number,
  ) {
    this.id = id;
    this.title = title;
    this.author = author; // Ensure author is set in the constructor
    this.publishedYear = publishedYear;
    this.stock = stock;
  }
}
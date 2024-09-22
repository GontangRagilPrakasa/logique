import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BookDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    publishedYear: number;
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    genres: string[];

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    constructor(
        title: string,
        author: string,
        publishedYear: number,
        genres: string[],
        stock: number
    ) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genres = genres;
        this.stock = stock;
    }
}

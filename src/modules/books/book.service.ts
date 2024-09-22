import { ILike, Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { AppDataSource } from "../../config/db";
import { Genre } from "./entities/genre.entity";

export class BookService {
    private bookRepository: Repository<Book>;
    private genreRepository: Repository<Genre>;
    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
        this.genreRepository = AppDataSource.getRepository(Genre);
    }

    private baseCondition = {
        relations: ['genres'],
      };

    async find(limit: number, page:number, keyword: string) {
        try {
            const [data, totalData] = await this.bookRepository.findAndCount({
                where: [
                    { title: ILike(`${keyword}%`) },
                    { author: ILike(`${keyword}%`) },
                    { genres: {
                        name : ILike(`%${keyword}%`)
                    } } 
                ],
                relations : [...this.baseCondition.relations],
                take : limit,
                skip : (page - 1) * limit
            })
            const totalPages = Math.ceil(totalData / limit);
            return {
                page,
                totalPages,
                totalData,
                data
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Unable to fetch books');
            }
        }

    }

    async create(data: Partial<Book> & { genres: string[] }){

        try {
            const existsData = await this.bookRepository.findOne({
                where: { title: data.title }
            })

            if (existsData) {
                throw new Error('Data already exists');
            }

            const genreEntities: Genre[] = [];
            for (const genreName of data.genres) {
                const genre = this.genreRepository.create({ name: genreName });
                await this.genreRepository.save(genre);
                genreEntities.push(genre);
            }

            const create = this.bookRepository.create({
                ...data, genres: genreEntities
            })
            return await this.bookRepository.save(create)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Unable to add book');
            }
        }
    }

    async findOne(id: string){
        try {
            const book = await this.bookRepository.findOne({
                where: { id },
                relations : [...this.baseCondition.relations],
            });
            return book;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Unable to fetch book');
            }
        }
    }

    async update(id:string, data: Partial<Book> & { genres: string[] }) {

        try {
            const existsData = await this.bookRepository.findOne({
                where: { id },
                relations : [...this.baseCondition.relations],
            })

            if (!existsData) {
                throw new Error('Data not found');
            }

            existsData.author = data?.author ?? existsData?.author
            existsData.publishedYear = data?.publishedYear ?? existsData?.publishedYear
            existsData.title = data?.title ?? existsData?.title
            existsData.stock = data?.stock ?? existsData?.stock

            if (data.genres) {
                for(const newGenre of data.genres ?? []) {
                    const findGenre = await this.genreRepository.findOne({
                        where : {
                            name : newGenre,
                            book_id : {
                                id : existsData.id
                            }
                        }
                    })
                    if (!findGenre) {
                        const genre = this.genreRepository.create({ name: newGenre });
                        await this.genreRepository.save(genre);
                        existsData?.genres?.push(genre);
                    }

                    const genresToRemove = existsData?.genres?.filter(genre => !data.genres.includes(genre.name));
                    existsData.genres = existsData?.genres?.filter(
                        (genre) => data.genres.includes(genre.name),
                    );
                    for (const genre of genresToRemove ?? []) {
                        this.genreRepository.delete({ id: genre.id });
                    }
                }        
            }

            return await this.bookRepository.save(existsData)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Unable to update book');
            }
        }
    }

    async delete(id: string){
        try {
            return await this.bookRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Unable to delete book');
            }
        }
    }
}
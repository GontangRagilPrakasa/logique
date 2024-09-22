import request from 'supertest';
import app from '../../app';
import { AppDataSource } from "../../config/db";
import { Book } from './entities/book.entity';
import { Genre } from './entities/genre.entity';

describe('API CRUD Tests', () => {
    var testBookId: any;
    var testNotBookId: any = "4ce139f0-f3b9-459a-a1de-b2a1d7689132";
    beforeAll(async () => {
        // Initialize the database connection
        await AppDataSource.initialize();

        const bookRepository = AppDataSource.getRepository(Book);
        const genreRepository = AppDataSource.getRepository(Genre);
        const data_genres = ["Fiction", "Drama"]
        const genreEntities: Genre[] = [];
            for (const genreName of data_genres) {
                const genre = genreRepository.create({ name: genreName });
                await genreRepository.save(genre);
                genreEntities.push(genre);
            }

        const newBook = bookRepository.create({
            title: 'Test Book',
            author: 'Test Author',
            publishedYear: 2021,
            genres: genreEntities,
            stock: 10,
        });
    
        const savedBook = await bookRepository.save(newBook);
        testBookId = savedBook.id; // Store the ID for further tests
    });
    
    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create a new books', async () => {

        // const newBook = {
        //     title: 'Laskar Pelangi Part 3',
        //     author: 'Andrea Hirata',
        //     publishedYear: 2005,
        //     genres: ["Fiction", "Drama"],
        //     stock: 100,
        // };

        // const res = await request(app)
        //     .post('/books')
        //     .set('x-api-key', "logique")
        //     .send(newBook);

        // expect(res.status).toBe(201);
    });


    // Read All
    it('should get all books', async () => {
        const res = await request(app)
        .get('/books')
        .set('x-api-key', 'logique');

        expect(res.status).toBe(200);
    });

    // Read One
    it('should get a single books by id', async () => {
        const bookId = testBookId;
        const res = await request(app)
        .get(`/books/${bookId}`)
        .set('x-api-key', "logique");

        expect(res.status).toBe(200);
    });

    it('should return 404 if books is not found', async () => {
        const nonExistentId = testNotBookId;
        const res = await request(app)
        .get(`/books/${nonExistentId}`)
        .set('x-api-key', "logique");

        expect(res.status).toBe(404);
    });

    // Update
    it('should update an books by id', async () => {

        const bookRepository = AppDataSource.getRepository(Book);
        const genreRepository = AppDataSource.getRepository(Genre);
        const data_genres = ["Horror"]
        const genreEntities: Genre[] = [];
        for (const genreName of data_genres) {
            const genre = genreRepository.create({ name: genreName });
            await genreRepository.save(genre);
            genreEntities.push(genre);
        }

        const booksId = testBookId;
        const existingBook = await bookRepository.findOneBy({ id: booksId });
        expect(existingBook).toBeDefined();

        const updateBook = {
            title: 'Test Book Update',
            author: 'Test Author',
            publishedYear: 2021,
            genres: genreEntities.map(genre => genre.name),
            stock: 10,
        };

        const res = await request(app)
            .put(`/books/${booksId}`)
            .set('x-api-key', "logique")
            .send(updateBook);

        expect(res.status).toBe(200);
    });

    // // Delete
    it('should delete an books by id', async () => {
        const booksId = testBookId;
        const res = await request(app)
        .delete(`/books/${booksId}`)
        .set('x-api-key', "logique");

        expect(res.status).toBe(200);
    });

    it('should delete return 404 if books is not found', async () => {
        const booksId = testNotBookId;
        const res = await request(app)
        .delete(`/books/${booksId}`)
        .set('x-api-key', "logique");

        expect(res.status).toBe(200);
    });

});
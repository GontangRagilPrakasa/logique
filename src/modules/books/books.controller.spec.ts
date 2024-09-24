import request from 'supertest';
import app from '../../app';
import { AppDataSource } from "../../config/db";
import { Book } from './entities/book.entity';
import { Genre } from './entities/genre.entity';

describe('API CRUD Tests', () => {
    var testBookId: any;
    var testNotBookId: any = "4ce139f0-f3b9-459a-a1de-b2a1d7689132";
    const blockedIP = '192.0.2.1'; // Simulated blocked IP
    beforeAll(async () => {
        // Initialize the database connection
        await AppDataSource.initialize();

        // const bookRepository = AppDataSource.getRepository(Book);
        // const genreRepository = AppDataSource.getRepository(Genre);
        // const data_genres = ["Fiction", "Drama"]
        // const genreEntities: Genre[] = [];
        //     for (const genreName of data_genres) {
        //         const genre = genreRepository.create({ name: genreName });
        //         await genreRepository.save(genre);
        //         genreEntities.push(genre);
        //     }

        // const newBook = bookRepository.create({
        //     title: '<script>alert("XSS");</script>',
        //     author: 'Test Author',
        //     publishedYear: 2021,
        //     genres: genreEntities,
        //     stock: 10,
        // });
    
        // const savedBook = await bookRepository.save(newBook);
        // testBookId = savedBook.id; 
    });
    
    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create a new books', async () => {

        const newBook = {
            title: "<script>alert('XSS');</script>",
            author: 'Andrea Hirata',
            publishedYear: 2005,
            genres: ["Fiction", "Drama"],
            stock: 100,
        };

        const res = await request(app)
            .post('/books')
            .set('x-api-key', "logique")
            .send(newBook);

        expect(res.status).toBe(201);
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
    // it('should update an books by id', async () => {

    //     const bookRepository = AppDataSource.getRepository(Book);
    //     const genreRepository = AppDataSource.getRepository(Genre);
    //     const data_genres = ["Horror"]
    //     const genreEntities: Genre[] = [];
    //     for (const genreName of data_genres) {
    //         const genre = genreRepository.create({ name: genreName });
    //         await genreRepository.save(genre);
    //         genreEntities.push(genre);
    //     }

    //     const booksId = testBookId;
    //     const existingBook = await bookRepository.findOneBy({ id: booksId });
    //     expect(existingBook).toBeDefined();

    //     const updateBook = {
    //         title: 'Test Book Update',
    //         author: 'Test Author',
    //         publishedYear: 2021,
    //         genres: genreEntities.map(genre => genre.name),
    //         stock: 10,
    //     };

    //     const res = await request(app)
    //         .put(`/books/${booksId}`)
    //         .set('x-api-key', "logique")
    //         .send(updateBook);

    //     expect(res.status).toBe(200);
    // });

    // // // Delete
    // it('should delete an books by id', async () => {
    //     const booksId = testBookId;
    //     const res = await request(app)
    //     .delete(`/books/${booksId}`)
    //     .set('x-api-key', "logique");

    //     expect(res.status).toBe(200);
    // });

    // it('should delete return 404 if books is not found', async () => {
    //     const booksId = testNotBookId;
    //     const res = await request(app)
    //     .delete(`/books/${booksId}`)
    //     .set('x-api-key', "logique");

    //     expect(res.status).toBe(200);
    // });

    // Rate Limiting Test
    it('should limit requests after a defined threshold', async () => {
        // Simulating a burst of requests to hit the limit
        const requests = Array.from({ length: 100 }).map(() => 
            request(app).get('/books').set('x-api-key', 'logique')
        );

        const responses = await Promise.all(requests);

        // Expect first 100 requests to succeed
        responses.forEach((response) => {
            expect(response.status).toBe(200);
        });

        // Send one additional request to hit the limit
        const response = await request(app).get('/books').set('x-api-key', 'logique');
        
        expect(response.status).toBe(429); // Too Many Requests
        expect(response.body).toHaveProperty('message', 'Too many requests from this IP, please try again later.'); // Adjust according to your response
    });

    // IP Blocking Test
    it('should block requests from a blocked IP', async () => {
        const res = await request(app)
            .get('/books')
            .set('x-api-key', 'logique')
            .set('X-Forwarded-For', blockedIP); // Simulating a request from a blocked IP

        expect(res.status).toBe(403); // Forbidden
        expect(res.body).toHaveProperty('message', 'Access denied.'); // Adjust according to your response
    });

});
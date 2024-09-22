import { BookService } from "./book.service"
import { Responses } from '../../utils/response'
import { Request, Response } from "express"
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BookDto } from "./dto/book.dto";

class BookController {
    private bookService: BookService;
    constructor(
    ){
        this.bookService = new BookService()
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const bookDto = plainToInstance(BookDto, req.body);
            const errors = await validate(bookDto);
            if (errors.length > 0) {
                const response = new Responses(false,"Validation Errors", req.method, 400,errors);
                res.status(400).json(response);
                return
            }
            const service = await this.bookService.create(req.body)

            res.status(201).json(new Responses(true, 'Data fetched successfully', req.method, 201, service));
       } catch(error) {
            if (error instanceof Error) {
                res.status(400).json(new Responses(false, error.message, req.method, 400, null))
            } else {
                res.status(500).json(new Responses(false, "Something Wrong", req.method, 500, null))
            }
            
       }
    }

    public async findAll(req: Request, res: Response ) : Promise<void> {
       try {

            const search = req.query.search ? req.query.search as string : '';
            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
            const service = await this.bookService.find(limit, page, search)
            if (service) {
                res.status(200).json(new Responses(true, "Data loaded", req.method, 200, service));
            } else {
                res.status(400).json(new Responses(true, "Unable to fetch books", req.method, 400, service));
            }
           
       } catch(error) {
            if (error instanceof Error) {
                res.status(400).json(new Responses(false, error.message, req.method, 400, null))
            } else {
                res.status(500).json(new Responses(false, "Something Wrong", req.method, 500, null))
            }
       }
    }

    public async findOne(req: Request, res: Response): Promise<void> {
        try {
            const service = await this.bookService.findOne(req.params.id);
            if (service) {
                res.status(200).json(new Responses(true, "Data loaded", req.method, 200, service));
            } else {
                res.status(404).json(new Responses(true, "Unable to fetch book", req.method, 404, service));
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json(new Responses(false, error.message, req.method, 404, null))
            } else {
                res.status(500).json(new Responses(false, "Something Wrong", req.method, 500, null))
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const bookDto = plainToInstance(BookDto, req.body);
            const errors = await validate(bookDto);
            if (errors.length > 0) {
                const response = new Responses(false,"Validation Errors", req.method, 400,errors);
                res.status(400).json(response);
                return
            }
            
            const service = await this.bookService.update(req.params.id, req.body);
            res.status(200).json(new Responses(true, "Data loaded", req.method, 200, service));
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json(new Responses(false, error.message, req.method, 400, null))
            } else {
                res.status(500).json(new Responses(false, "Something Wrong", req.method, 500, null))
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const service = await this.bookService.delete(req.params.id);
            res.status(200).json(new Responses(true, "Book deleted successfully", req.method, 200, service));
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json(new Responses(false, error.message, req.method, 404, null))
            } else {
                res.status(500).json(new Responses(false, "Something Wrong", req.method, 500, null))
            }
        }
    }
 }

 export default new BookController()
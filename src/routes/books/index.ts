import { Router} from "express"
import BookController from "../../modules/books/book.controller"

const router = Router()

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", BookController.create)

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search for books by title or author
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of results per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       publishedYear:
 *                         type: integer
 *                       genres:
 *                         type: array
 *                         items:
 *                           type: string
 *                       stock:
 *                         type: integer
 */
router.get("/", BookController.findAll)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single book
 *       404:
 *         description: Book not found
 */
router.get("/:id", BookController.findOne)

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put("/:id", BookController.update)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete("/:id", BookController.delete)


export default router
# Digital Logique Indonesia REST API

This is a REST API for the Digital Logique Indonesia application, built using Node.js, TypeScript, and MySQL. The API provides functionality to manage a collection of books, including CRUD operations.

## Features

- Create, Read, Update, and Delete books
- Middleware for API key authentication (`x-api-key`)
- MySQL as the database

## Technologies Used

- Node.js ( version: `v19.9.0` ) and NPM ( version: `9.6.3` )
- TypeScript
- MySQL
- TypeORM (for database interaction)
- Express.js (for routing)
- Middleware for handling API keys

## API Endpoints

### 1. Create a Book

- **Endpoint:** `POST /`
- **Request Body:**
    ```json
    {
      "title": "Laskar Pelangi",
      "author": "Andrea Hirata",
      "publishedYear": 2005,
      "genres": ["Fiction", "Drama"],
      "stock": 100
    }
    ```

### 2. Get All Books

- **Endpoint:** `GET /`
- **Response:**
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "author": "string",
        "publishedYear": "number",
        "genres": ["string"],
        "stock": "number"
      }
    ]
    ```

### 3. Get a Book by ID

- **Endpoint:** `GET /:id`
- **Response:**
    ```json
    {
      "id": "string",
      "title": "string",
      "author": "string",
      "publishedYear": "number",
      "genres": ["string"],
      "stock": "number"
    }
    ```

### 4. Update a Book

- **Endpoint:** `PUT /:id`
- **Request Body:**
    ```json
    {
      "title": "Laskar Pelangi Part 2",
      "author": "Andrea Hirata",
      "publishedYear": 2005,
      "genres": ["Fiction", "Drama"],
      "stock": 100
    }
    ```

### 5. Delete a Book

- **Endpoint:** `DELETE /:id`

## Middleware

### API Key Middleware

- The API requires a valid `x-api-key` in the request headers for authentication. This middleware checks for the presence and validity of the API key.

## Database Configuration

Ensure your MySQL database is set up and configured correctly. The connection settings should be defined in your environment variables or configuration files.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <folder base git>
   ```
2. Install Dependencies:
 ```bash
   npm install
   ```
3. Start the application:
 ```bash
   npm run dev
   ```
## Running with Docker Compose

1. Ensure Docker and Docker Compose are installed on your machine.
2. Build and start the application:
    ```bash
    docker-compose up --build
    ```
3. Access the application at {port}.
4. To stop and remove the containers, use:
    ```bash
    docker-compose down
    ```

## Postman Collection

You can import the Postman collection for this API by following these steps:

1. Open Postman.
2. Click on "Import" in the top left corner.
3. Choose the "Link" tab and paste the following URL: https://drive.google.com/file/d/1N2cRsYw7IdR2JnIq-m4JwIvZjGnGryyl/view?usp=sharing OR https://speeding-shuttle-756871.postman.co/workspace/Logique~f14365c2-a0c1-49dc-9a61-d13a72cec546/folder/3346074-d21ada8d-d873-49b2-9f1f-f50df6032aed?action=share&creator=3346074&ctx=documentation&active-environment=3346074-0693ea82-7229-4f29-a1fc-ca04e65a4e32


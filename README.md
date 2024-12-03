# Backend Service for Final Project PAW 10

## Deskripsi

Menghubungkan aplikasi [Frontend](https://booknest.id) dengan database MongoDB. Backend ini dibuat menggunakan Express.js dan Mongoose.

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Lev1reG/be-final-project-paw10.git
cd be-final-project-paw10
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root folder project dengan isi sebagai berikut:

```env
MONGODB_URI=your_mongodb_uri
CRYPTO_SECRET=your_crypto_secret
JWT_VERIFICATION_SECRET=your_jwt_verification_secret
```

### 4. Jalankan Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`.

## API Documentation

### Authentication

#### Register

- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "phoneNumber": "string",
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  **Status Code**: `200`
  ```json
  {
    "message": "User created successfully"
  }
  ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  **Status Code**: `200`
  ```json
  {
    "message": "Login successful"
  }
  ```

#### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Response**:
  **Status Code**: `200`
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Books

#### Search Books

- **URL**: `/books/search?`
- **Method**: `GET`
- **Query Parameters**:
  - `title` (optional): Filter books by title (partial match, case insensitive).
  - `available` (optional): If true, only return books that are currently available (stock > 0).
  - `genre` (optional): Filter books by genre. Can be a single value or an array of genres.
  - `author` (optional): Filter books by author (partial match, case insensitive).
  - `language` (optional): Filter books by language (partial match, case insensitive).
  - `page` (optional): Page number for pagination (default is 1).
  - `limit` (optional): Number of items per page (default is 10).
- **Response**:
  **Status Code**: `200`
  ```json
  {
    "pagination": {
      "currentPage": 1,
      "totalPages": 0,
      "pageSize": 10,
      "totalBooks": 0
    },
    "books": []
  }
  ```

#### Get Newest Books

- **URL**: `/books/newest`
- **Method**: `GET`
- **Response**:
  **Status Code**: `200`
  ```json
  [
    {
      "borrowCount": number,
      "book": {
        "_id": "string",
        "title": "string",
        "author": "string",
        "isbn": "string",
        "publisher": "string",
        "year": number,
        "genre": ["string"],
        "description": "string",
        "language": "string",
        "coverImageUrl": "string",
        "pages": number,
        "stock": number,
      }
    }
  ]
  ```

#### Get Popular Books

- **URL**: `/books/popular`
- **Method**: `GET`
- **Response**:
  **Status Code**: `200`
  ```json
  [
    {
      "borrowCount": number,
      "book": {
        "_id": "string",
        "title": "string",
        "author": "string",
        "isbn": "string",
        "publisher": "string",
        "year": number,
        "genre": ["string"],
        "description": "string",
        "language": "string",
        "coverImageUrl": "string",
        "pages": number,
        "stock": number,
      }
    }
  ]
  ```

#### Get Book Details

- **URL**: `/books/:id`
- **Method**: `GET`
- **Response**:
  **Status Code**: `200`
  ```json
  {
    "_id": "string",
    "title": "string",
    "author": "string",
    "isbn": "string",
    "publisher": "string",
    "year": number,
    "genre": ["string"],
    "description": "string",
    "language": "string",
    "coverImageUrl": "string",
    "pages": number,
    "stock": number,
  }
  ```

#### Borrow Book

- **URL**: `/books/:id/borrow`
- **Method**: `GET`
- **Response**:
  **Status Code**: `200`

  ```json
  {
    "message": "Book borrowed successfully",
    "books": {
        "_id": "string",
        "title": "string",
        "author": "string",
        "isbn": "string",
        "publisher": "string",
        "year": number,
        "genre": ["string"],
        "description": "string",
        "language": "string",
        "coverImageUrl": "string",
        "pages": number,
        "stock": number,
      }
  }
  ```

#### Return Book

- **URL**: `/books/:id/return`
- **Method**: `GET`
- **Response**:
  **Status Code**: `200`

  ```json
  {
    "message": "Book returned successfully",
    "books": {
        "_id": "string",
        "title": "string",
        "author": "string",
        "isbn": "string",
        "publisher": "string",
        "year": number,
        "genre": ["string"],
        "description": "string",
        "language": "string",
        "coverImageUrl": "string",
        "pages": number,
        "stock": number,
      }
  }
  ```

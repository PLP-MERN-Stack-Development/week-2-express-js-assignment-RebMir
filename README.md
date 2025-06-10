# 📦 Products API – Express.js

This is a RESTful API built using Express.js to manage a collection of products. The API supports standard CRUD operations, middleware integration, error handling, and advanced features like filtering, pagination, and search.

---

## 🚀 How to Run the Server

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Copy `.env.example` to `.env` and set the environment variables.

```bash
cp .env.example .env
```

Example `.env`:

```
API_KEY=12345
PORT=3000
```

### 4. Start the Server

```bash
node server.js
```

The server will run at `http://localhost:3000`

---

## 📚 API Endpoints Documentation

All endpoints prefixed with `/api/products`.

### 🔹 GET `/api/products`

**Description:** Get a list of all products.

**Optional Query Parameters:**

* `category`: Filter products by category.
* `search`: Search by product name (case-insensitive).
* `page`: Page number for pagination (default: 1).
* `limit`: Number of results per page (default: 10).

**Example:**

```
GET /api/products?category=Electronics&search=phone&page=2&limit=5
```

**Response:**

```json
{
  "data": [ /* array of products */ ],
  "total": 20
}
```

---

### 🔹 GET `/api/products/:id`

**Description:** Get a specific product by its ID.

**Example:**

```
GET /api/products/1234-abcd
```

**Response:**

```json
{
  "id": "1234-abcd",
  "name": "Smartphone",
  "description": "Latest model",
  "price": 699.99,
  "category": "Electronics",
  "inStock": true
}
```

---

### 🔹 POST `/api/products`

**Description:** Create a new product.

**Headers:**

* `x-api-key`: API key (required)

**Body Parameters:**

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category Name",
  "inStock": true
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category Name",
  "inStock": true
}
```

---

### 🔹 PUT `/api/products/:id`

**Description:** Update an existing product by ID.

**Headers:**

* `x-api-key`: API key (required)

**Body Parameters:** Same as POST.

**Response:**

```json
{
  "id": "1234-abcd",
  "name": "Updated Product Name",
  ...
}
```

---

### 🔹 DELETE `/api/products/:id`

**Description:** Delete a product by ID.

**Headers:**

* `x-api-key`: API key (required)

**Response:**

HTTP 204 No Content

---

### 🔹 GET `/api/products/stats`

**Description:** Get product count grouped by category.

**Response:**

```json
{
  "Electronics": 5,
  "Clothing": 8,
  "Books": 3
}
```

---

## 🔒 Authentication

Most write operations require an API key:

* Add the following header to your requests:

  ```
  x-api-key: 12345
  ```

---

## ⚠️ Error Handling

Errors are returned in the following format:

```json
{
  "error": "Error message here"
}
```

Common errors include:

* 400 Bad Request – Invalid product data
* 401 Unauthorized – Missing or invalid API key
* 404 Not Found – Product does not exist
* 500 Internal Server Error – Unexpected error

---

## 🧪 Testing Tools

You can test the API using:

* [Postman](https://www.postman.com/)
* [Insomnia](https://insomnia.rest/)
* `curl` from the command line

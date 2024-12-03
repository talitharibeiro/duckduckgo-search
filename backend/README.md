# DuckDuckGo Search API Proxy

This is a backend application built with **NestJS** that acts as a proxy for the DuckDuckGo API. It allows users to perform searches and stores the search history in a JSON file for persistence. The application is designed to be modular and scalable, supporting `GET`, `POST`, and `DELETE` requests for search and history management.

## Features

- **Search DuckDuckGo**: Perform searches via the DuckDuckGo API.
- **Search History**: Save, retrieve, and clear search history.
- **Pagination**: Supports pagination for search results.
- **Persistence**: Stores the search history in a JSON file (`query-history.json`) to ensure data is not lost after server restarts.

## Endpoints

### `GET /search`

Performs a search using the DuckDuckGo API.

**Query Parameters:**

- `q` (string): The search term (required).
- `offset` (number): The starting point for pagination (optional, default: `0`).
- `limit` (number): The number of results to return (optional, default: `10`).

**Example:**

```bash
curl "http://localhost:3000/search?q=example&offset=0&limit=5"
```

**Response:**

```json
{
  "results": [
    {
      "title": "Example Domain",
      "url": "https://example.com"
    },
    {
      "title": "Example 2",
      "url": "https://example2.com"
    }
  ],
  "totalResults": 50
}
```

### `POST /search`

Performs a search using the DuckDuckGo API. The search term is provided in the request body.

**Request Body:**

```json
{
  "query": "example",
  "offset": 0,
  "limit": 5
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/search -H "Content-Type: application/json" -d '{"query": "example", "offset": 0, "limit": 5}'
```

**Response:**

```json
{
  "results": [
    {
      "title": "Example Domain",
      "url": "https://example.com"
    },
    {
      "title": "Example 2",
      "url": "https://example2.com"
    }
  ],
  "totalResults": 50
}
```

### `GET /search/history`

Retrieves the search history.

**Example:**

```bash
curl http://localhost:3000/search/history
```

**Response:**

```json
["example", "example query", "another search"]
```

### `DELETE /search/history`

Clears the search history.

**Example:**

```bash
curl -X DELETE http://localhost:3000/search/history
```

**Response:**

```json
{
  "message": "Search history cleared successfully"
}
```

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/talitharibeiro/duckduckgo-search
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm run start
   ```

The server will be available at `http://localhost:3000`.

## File Structure

```
/backend
├── /src
│   ├── /controllers          # API controllers (routes)
│   │    └── search.controller.ts
│   ├── /services             # Business logic
│   │    └── search.service.ts
│   ├── /dtos                 # Data Transfer Objects (validation)
│   │    └── search-query.dto.ts
│   ├── /history              # Persistent data storage
│   │    └── query-history.json
│   ├── app.module.ts         # Main module
│   └── main.ts               # Entry point
├── package.json
└── tsconfig.json
```

## Environment Variables

None required for this project. The API URL is hardcoded (`http://api.duckduckgo.com`).

## Notes

- The search history is saved in `query-history.json` under the `history` directory. If this directory does not exist, it will be created automatically.

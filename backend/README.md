# DuckDuckGo Search API Proxy

This is a backend application built with **NestJS** that acts as a proxy for the DuckDuckGo API. It allows users to perform searches and stores the search history in a JSON file for persistence. The application is designed to be modular and scalable, supporting both `GET` and `POST` search requests.

## Features

- **Search DuckDuckGo**: Perform searches via the DuckDuckGo API.
- **Search History**: Save and retrieve search history.
- **Persistence**: Stores the search history in a JSON file (`query-history.json`) to ensure data is not lost after server restarts.

## Endpoints

### `GET /search`

Performs a search using the DuckDuckGo API.

**Query Parameters:**

- `q` (string): The search term.

**Example:**

```bash
curl http://localhost:3000/search?q=example
```

**Response:**

```json
[
  {
    "title": "Example Domain",
    "url": "https://example.com"
  },
  {
    "title": "Example 2",
    "url": "https://example2.com"
  }
]
```

### `POST /search`

Performs a search using the DuckDuckGo API. The search term is provided in the request body.

**Request Body:**

```json
{
  "query": "example"
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/search \
-H "Content-Type: application/json" \
-d '{"query": "example"}'
```

**Response:**

```json
[
  {
    "title": "Example Domain",
    "url": "https://example.com"
  },
  {
    "title": "Example 2",
    "url": "https://example2.com"
  }
]
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
- The backend is modular and can be extended to include additional features like user authentication or advanced search filtering.

# DuckDuckGo Search Frontend

This project is a React-based frontend application that integrates with a backend API to perform searches using the DuckDuckGo API. It includes features like search, pagination, search history, and dynamic highlighting of search terms.

---

## Features

- **Search Functionality**: Submit search queries to fetch results from the DuckDuckGo API.
- **Pagination**: Navigate through paginated search results.
- **Search History**: View and reuse past search queries.
- **Search Term Highlighting**: Highlight the searched term within the results.

---

## Technologies Used

- **React**: Frontend library for building the user interface.
- **TypeScript**: Ensures type safety throughout the project.
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: Provides utility-first styling for a consistent design.
- **Testing Library**: For writing unit tests.

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **npm or yarn**: A package manager for installing dependencies.

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Backend API**:
   Ensure the backend API is running on `http://localhost:3000` or update the base URL in `src/services/api.ts` if necessary.

4. **Start the Development Server**:

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3001` (or the configured port).

---

## Folder Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components (SearchBar, HistorySidebar, etc.)
│   ├── interfaces/       # TypeScript interfaces
│   ├── pages/            # Page components (e.g., Home)
│   ├── services/         # API service integrations
│   ├── index.css         # Global CSS and Tailwind configuration
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

---

## Available Scripts

### `npm start`

Runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm test`

Runs the test suite.

### `npm build`

Builds the app for production to the `build` folder.

---

## Environment Variables

You can create a `.env` file in the root directory and set the following variables:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
PORT=3001
```

---

## Features Breakdown

### 1. **Search**

- Input a search term and fetch results from the backend.
- Results are displayed in a paginated format.

### 2. **Pagination**

- Navigate through pages of results using buttons.

### 3. **Search History**

- A sidebar shows a list of previous search queries.
- Clicking on a query in the history repeats the search.

### 4. **Search Highlighting**

- Highlights the search term within the results.

### 5. **Clear Functionality**

- Clear the search input and results using the "✖" button.

---

## Contact

For any questions or issues, feel free to reach out at [talitha.reclaim@gmail.com].

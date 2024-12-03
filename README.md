# DuckDuckGo Search Application

This repository contains a full-stack application for searching using the DuckDuckGo API. The project is divided into two main parts:

- **Backend**: A NestJS-based API proxy that handles search queries, pagination, and history persistence.
- **Frontend**: A React and TypeScript application that provides a user-friendly interface to interact with the backend.

---

## Overview

This application allows users to:

1. Perform searches through the DuckDuckGo API.
2. View paginated search results.
3. Access and manage their search history (view, reuse, and clear).
4. Highlight search terms within the results.

---

## Repository Structure

```
duckduckgo-search/
├── backend/               # NestJS backend project
│   ├── README.md          # Backend-specific instructions
│   ├── ...
├── frontend/              # React frontend project
│   ├── README.md          # Frontend-specific instructions
│   ├── ...
└── README.md              # Main repository documentation
```

Each directory (`backend/` and `frontend/`) contains its own `README.md` with detailed setup and usage instructions.

---

## Setup Instructions

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/talitharibeiro/duckduckgo-search.git
   cd duckduckgo-search
   ```

2. **Setup Backend**:

   Navigate to the `backend/` directory and follow the instructions in the backend's `README.md` to install dependencies and start the server.

3. **Setup Frontend**:

   Navigate to the `frontend/` directory and follow the instructions in the frontend's `README.md` to install dependencies and start the development server.

---

## Access

- **Backend**: Runs on `http://localhost:3000` by default.
- **Frontend**: Runs on `http://localhost:3001` by default.

---

## Notes

- Detailed instructions for each part (backend and frontend) are available in their respective `README.md` files.
- The backend includes search history persistence in a JSON file, while the frontend includes a responsive UI with features like history management and search term highlighting.

---

## Contact

For any questions or feedback, feel free to contact talitha.reclaim@gmail.com.

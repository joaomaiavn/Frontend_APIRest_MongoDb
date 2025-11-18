# API Restful CRUD N3 (English)

This is a RESTful API built with Node.js using Express and MongoDB (Mongoose) for CRUD operations on people.

## Features
- **Create person**: POST `/person`
- **List people**: GET `/person`
- **Get person by ID**: GET `/person/:id`
- **Update person**: PATCH `/person/:id`
- **Delete person**: DELETE `/person/:id`

## Technologies
- Node.js
- Express
- MongoDB (Mongoose)
- Jest + Supertest (tests)
- ESLint (static analysis)

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the `.env` file with your MongoDB credentials:
   ```env
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Frontend (React + Vite)
- Frontend code lives in `frontend/`.
- In development, use the Vite dev server; in production, the backend serves the build from `frontend/dist`.

### Development
```bash
cd frontend
npm install
npm run dev
```
The app will open (by default) at `http://localhost:5173`. For the API base URL, you can configure a Vite env (optional):
```
VITE_API_URL=http://localhost:3000
```

### Production build and serve via backend
```bash
cd frontend
npm run build
```
This generates `frontend/dist`. With the backend server running (`npm start` at the project root), visit `http://localhost:3000/` to see the SPA.

### SPA Routes
- `/` (Home)
- `/cadastro` (Create contact)
- `/cadastro/:id` (Edit contact)
- `/listagem` (List contacts)
- Invalid route → shows the SPA 404 page

## Tests and Coverage
- To run tests:
  ```bash
  npm test
  ```
- To generate the coverage report:
  ```bash
  npm run test:coverage
  ```
  The report will be available at `coverage/lcov-report/index.html`.

### Headless route test for the frontend
There is a simple E2E test using a headless browser (Puppeteer) to validate the SPA routes already served by the backend.

1) Ensure the backend is running and serving the frontend build (or use `VITE_API_URL` pointing to the backend):
```bash
npm start
```

2) In another terminal, run the test in the `frontend` directory:
```bash
cd frontend
npm install
npm run build   # if you haven't generated the dist yet
npm run test:routes
```
The script hits `http://localhost:3000` by default. To change it, set `E2E_BASE_URL`:
```bash
E2E_BASE_URL=http://localhost:4000 npm run test:routes
```

## Code Standards
- The project uses ESLint to enforce good practices.
- To run static analysis:
  ```bash
  npm run lint
  ```

## Folder Structure
```
models/         # Mongoose models
routes/         # API routes
server.js       # Main server file
package.json    # Project configuration
```

## Test Coverage
- The project has over 80% test coverage, including success and error scenarios for all routes.

## Author
João Maia

---
Project for studying and demonstrating a RESTful API with Node.js.

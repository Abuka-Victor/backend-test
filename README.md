# Backend Test Project

Welcome to my backend test project

## Features

- **Express.js:** A fast, minimalist web framework for Node.js.
- **TypeScript:** A superset of JavaScript that adds static types and improved tooling.
- **ESLint:** Enforce code quality and consistent formatting.
- **Mocha and Chai:** A powerful testing framework.
- **dotenv:** Load environment variables from a `.env` file.
- **Docker:** Containerization for easy deployment.

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Abuka-Victor/backend-test.git
   cd backend-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables:

   ```env
   PORT=3000
   DATABASE_URL=your_db_url
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the app.

## Project Structure

- `src/`: Contains the TypeScript source code.
  - `app.ts`: Entry point for the Express application.
  - `routes/`: Define your API routes here.
  - `controllers/`: Handle route logic.
  - `middlewares/`: Custom middleware functions.
- `test/`: Contains unit and integration tests.
- `config/`: Configuration files and environment variable management.
- `dist/`: Compiled TypeScript code (generated after build).

## Testing

- Run tests using Jest:
  ```bash
  npm test
  ```

## Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Run the production server:
   ```bash
   npm start
   ```

## Docker Support

1. Build the Docker image:

   ```bash
   docker build -t backend-test .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 backend-test
   ```

## Contact

For inquiries, contact [Your Email](abukavictoro@gmail.com).

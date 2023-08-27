# Backend Test Project

Welcome to my backend test project

[View Project Documentation on Postman](https://documenter.getpostman.com/view/17358662/2s9Y5YSNAT)

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
   POSTGRES_URI=your_postgres_uri
   APP_SECRET=your_app_secret
   PORT=8080_was_what_I_used_in_development
   ACCESS_TOKEN_PRIVATE_KEY=your_access_token_secret
   REFRESH_TOKEN_PRIVATE_KEY=your_refresh_token_secret
   NODE_ENV=development_or_production
   REDIS_URI=your_redis_uri
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your postman and navigate to `http://localhost:PORT` to access the app and test the routes.
6. Navigate to `http://localhost:PORT/docs` to access the swagger docs UI.

## Project Structure

- `src/`: Contains the TypeScript source code.
  - `app.ts`: Entry point for the Express application.
  - `routes/`: Define your API routes here.
  - `controllers/`: Handle route logic.
  - `middleware/`: Custom middleware functions.
  - `test/`: Contains test files
  - `config/`: Configuration files and environment variable management.
  - `models/`: Contains model classes.
  - `utils/`: A folder for helper functions and my swagger setup
  - `validators/`: A folder for api body validators.
- `dist/`: Compiled TypeScript code (generated after build).

## Testing

- Run tests using Mocha and Chai:
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
   docker run -p 3000:8080 backend-test
   ```

## Contact

For inquiries, contact [Your Email](abukavictoro@gmail.com).

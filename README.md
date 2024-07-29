
## 📽️ App and  Tests preview 

https://vimeo.com/991679137?share=copy


## 💻 Setup and Execution

### Project Setup

To set up the project, run `npm install` in each directory (`/client` and `/server`).

### Running the Back-End

- **To automatically restart on changes**:
  ```bash
  npm run watch
  ```
- **To run without automatic restarts**:
  ```bash
  npm run start
  ```

> **Warning:** When running the server in watch mode, any new data added to the database will be erased each time a file changes.

The server will be running at `http://localhost:3547`.

### Running the Front-End

To start the front-end, run:
```bash
npm run start
```

The client will be accessible at `http://localhost:3000`.

### Running Tests

#### Back-End Tests

To run all back-end tests, follow these steps:

1. Navigate to the back-end directory:
   ```bash
   cd server
   ```

2. Install the necessary dependencies, if they are not already installed:
   ```bash
   npm install
   ```

3. Run the tests:
   ```bash
   npm test
   ```

#### E2E Tests for the Front-End (Backend needs to be running)

To run end-to-end (E2E) tests on the front-end using Playwright, follow these steps:

1. Navigate to the front-end directory:
   ```bash
   cd client
   ```

2. Install the necessary dependencies, if they are not already installed:
   ```bash
   npm install
   ```

3. Run the tests:
   ```bash
   npx playwright test
   ```

### Docker and Docker Compose

To run the entire application at once, execute the following command in the project's main folder:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`.

### Code Formatting

Prettier is set up for code formatting. If your editor is not configured for Prettier, you can format the code with the following command:

```bash
npx prettier . --write
```

---

Made with 🧡 by Gabriel Fernandes 👋
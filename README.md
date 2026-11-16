# Express.js Middleware – Patient Management API

## Project Description

This project is a Patient Management REST API developed using Node.js and Express.js.

It demonstrates different types of middleware in Express.js, including built-in middleware, third-party middleware, custom middleware, route-specific validation middleware, 404 middleware, and error-handling middleware.

The application performs CRUD operations (Create, Read, Update, Delete) on patient details using a temporary in-memory JavaScript array.
## Live Demo

**Live Application:** https://middleware-express-app-pwl7.onrender.com/

## Technologies Used

- Node.js
- Express.js
- CORS
- Morgan
- JavaScript
- REST API
- Postman (for API testing)

## Middleware Used

### 1. Third-Party Middleware
- **CORS:** Allows cross-origin requests.
- **Morgan:** Logs HTTP request details in the terminal.

### 2. Built-in Middleware
- `express.json()` – Parses incoming JSON data.
- `express.urlencoded()` – Parses URL-encoded form data.

### 3. Custom Middleware
- **Logger Middleware:** Records HTTP method, URL, response status code, and response time in `Server.log`.

### 4. Route-Specific Middleware
- **Validation Middleware:** Checks whether patient name, gender, and ward are provided before creating a patient.

### 5. Error Handling Middleware
- **404 Middleware:** Handles requests to unavailable routes.
- **Error-Handling Middleware:** Handles application errors and sends appropriate error responses.

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/patients` | Add a new patient |
| GET | `/api/v1/patients` | Get all patients |
| GET | `/api/v1/patients?ward=General` | Get patients by ward |
| GET | `/api/v1/patients/:id` | Get a patient by ID |
| PUT | `/api/v1/patients/:id` | Update patient details |
| DELETE | `/api/v1/patients/:id` | Delete a patient |

## Example Patient JSON

```json
{
  "name": "Rahul",
  "gender": "Male",
  "ward": "General"
}
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd express-middleware
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. The server runs at:

   ```text
   http://localhost:6500
   ```

## Testing

You can test the API using Postman.

For example, to add a patient:

- Method: POST
- URL: `http://localhost:6500/api/v1/patients`
- Body: Select raw → JSON

```json
{
  "name": "Rahul",
  "gender": "Male",
  "ward": "General"
}
```

## Data Storage

This application uses a temporary in-memory JavaScript array to store patient details.

**Note:** Patient data and generated log entries are stored locally. Patient data will be lost when the server restarts. The `Server.log` file records requests while the application is running.

## Author

**Santhoshini**

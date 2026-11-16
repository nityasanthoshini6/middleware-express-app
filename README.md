# Express.js Middleware Application

## Project Description

This project demonstrates the implementation of middleware in Express.js using Node.js.

Middleware functions are used to execute code during the request-response cycle. They can access request objects, response objects, and the `next()` function to pass control to the next middleware.

This project demonstrates how middleware works in Express.js and how it helps process HTTP requests.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API

## Features

- Creating custom middleware
- Using built-in Express middleware
- Processing HTTP requests and responses
- Logging request details
- Handling middleware execution using `next()`
- Understanding the request-response cycle

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

5. Open the application:

   ```text
   http://localhost:4000
   ```

## What is Middleware?

Middleware is a function that executes between receiving a client request and sending a response.

A middleware function can:
- Execute code.
- Modify request and response objects.
- End the request-response cycle.
- Call `next()` to move to the next middleware.

## Example Middleware

```javascript
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);
```

## Author

**Santhoshini**
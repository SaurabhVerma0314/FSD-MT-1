# Event Registration Management API (Set A)

A RESTful API built with Node.js and Express.js to manage college event registrations using an in-memory data store.

## Setup and Run Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node server.js
   ```

3. The server will run on `http://localhost:3000`.

## API Endpoints

* `GET /api/registrations` - Get all registration records
* `GET /api/registrations/:id` - Get a single registration by ID
* `GET /api/registrations/filter?department=CSE` - Filter records by department (case-insensitive)
* `GET /api/registrations/pending` - Get all records with `Pending` payment status
* `POST /api/registrations` - Create a new registration record
* `PUT /api/registrations/:id` - Update an existing registration record
* `DELETE /api/registrations/:id` - Delete a registration record

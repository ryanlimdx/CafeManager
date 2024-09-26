# Café Manager

## Overview
[Café Manager](https://cafemanager.onrender.com/) is designed to help users manage cafés and their employees efficiently. It offers functionalities to add, edit, delete, and view both cafés and their associated employees.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setting Up Your Local Environment](#setting-up-your-local-environment)
- [API Endpoints](#api-endpoints)
- [Additional Information](#additional-information)


## Features

### Café Management
- View a list of cafés, including their description, location, and the number of employees.
- Add a new café with details such as name, description, and location.
- Edit the details of an existing café.
- Delete a café from the system (with confirmation).

### Employee Management
- View a list of employees, including their name, phone number, email, gender, and assigned café.
- Filter employees by their assigned café.
- Add a new employee with details such as name, email, phone number, gender, and assigned café.
- Edit the details of an existing employee.
- Delete an employee from the system (with confirmation).
- Calendar input for assigning start dates for employees.

### Navigation
- Seamless navigation between the cafés and employees pages.
- Each café links to its associated employees for easy management.

## Technologies

- **Frontend**: React, Material-UI (MUI), TanStack React Router, React Query, AG-Grid
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **API Communication**: RESTful APIs

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Docker** (latest version): [Download Docker](https://www.docker.com/get-started/)

Optionally, the following tool is useful to facilitate testing of API endpoints:

- **Postman** (latest version): [Download Postman](https://www.postman.com/downloads/)

## Setting Up with Docker

### Step 1: Clone the Repository
```bash
git clone https://github.com/ryanlimdx/CafeManager.git
cd cafe-manager
```

### Step 2: Set Up the Environment Variables
Create a .env file in the root directory with the following content:

```env
MONGO_URI=your-mongodb-connection-string
REACT_APP_API_BASE_URL=http://localhost:5000/api/
```

Feel free to make use of [.env.example](./.env.example)

Make sure to whitelist the IP address you will be using in Mongo Atlas.

### Step 3: Run the Application Using Docker
To run the application in Docker, use Docker Compose. Run the following command from the root of your project:

```bash
docker-compose up --build
```

This command will:

- Pull or build necessary Docker images for the frontend, backend, and MongoDB.
- Spin up the containers for each service (MongoDB, Backend, Frontend).

Docker will set up and run the following services:

- Frontend: Available at http://localhost:3000 (or the port you specify).
- Backend: Available at http://localhost:5000 (or the port you specify).
- MongoDB: A MongoDB database container is set up and linked with the backend.

### Step 4: Access the Application
Once the containers are up and running:
- Open a browser and visit http://localhost:3000 for the frontend.
- Make API requests to http://localhost:5000/api for backend routes.

### Step 5: Stopping the Application
To stop the application, you can press `CTRL+C` in the terminal running Docker, or run:

```bash
docker-compose down
```
This will stop and remove the containers.

## API Endpoints
For documentation (and some sample data) of the API endpoints, please refer to [API Endpoints](./docs/api-endpoints.md). To test the API endpoints, you may use a tool like **Postman** and create requests to the following URL:
```
http://localhost:5000/api/path
```
Replace `/path` with actual endpoints (such as `/cafes` or `/employees`) to interact with the API through `GET`, `PUT`, `POST` and `DELETE` requests.

The following are available endpoints:

### Cafés API
- `GET /cafes` - Retrieve all cafés or filter by location.
- `POST /cafes` - Add a new café.
- `PUT /cafes/:id` - Update an existing café.
- `DELETE /cafes/:id` - Delete a café.

### Employees API
- `GET /employees` - Retrieve all employees or filter by café.
- `POST /employees` - Add a new employee.
- `PUT /employees/:id` - Update an existing employee.
- `DELETE /employees/:id` - Delete an existing employee.

## Additional Information
To rebuild the Docker images (if there are changes in the Dockerfiles):

```bash
docker-compose up --build
```

To view running containers:

```bash
docker ps
```

To stop and remove containers, networks, and volumes:

```bash
docker-compose down --volumes
```
